import {
  Card,
  Form,
  message,
  Modal,
} from 'antd';
import { setEvents } from 'app/actions/schedule';
import {
  activateCalendarIntegration,
  getCalendarEvents,
  getEkvvCalendarUrl,
  isCalendarIntegrationActive,
} from 'app/api/ekvv/calendar';
import login from 'app/api/ekvv/login';
import LoginForm from 'app/components/LoginForm';
import {
  fetchCredentials,
  storeCredentials,
} from 'app/database/ekvv/credentials';
import {
  storeCalendarData,
  storeEvents,
} from 'app/database/ekvv/events';
import InvalidCredentials from 'app/exceptions/InvalidCredentials';
import LoginFailed from 'app/exceptions/LoginFailed';
import { confirm } from 'app/utils/antd';
import { parseCalendar } from 'app/utils/calendar';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';


/**
 * Ensure that the calendar integration is active.
 *
 * @returns {Promise<boolean|Document>}
 */
async function ensureCalendarIntegration() {
  const [isCalendarEnabled, newsFeedPage] = await isCalendarIntegrationActive();

  if (!isCalendarEnabled) {
    const permissionGranted = await confirm({
      title: 'Kalenderintegration ist nicht aktiviert. Soll die Kalenderintegration automatisch aktiviert werden?',
      content: 'Ohne aktivierte Kalenderintegration kann dein Stundenplan nicht geladen werden.',
      okText: 'Ja bitte',
      cancelText: 'Nein danke',
    });

    if (permissionGranted) {
      await activateCalendarIntegration(newsFeedPage);
    }
    else {
      return false;
    }
  }

  const [isCalendarFinallyEnabled] = await isCalendarIntegrationActive();

  return isCalendarFinallyEnabled;
}

/**
 * Start component
 *
 * @returns {*}
 */
export default function Start() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleFinish = useCallback(async (values) => {
    setIsLoading(true);

    try {
      const loggedIn = await login(values.username, values.password);

      if (loggedIn) {
        const currentlySavedCredentials = await fetchCredentials();

        if (typeof currentlySavedCredentials == 'undefined' || values.username !== currentlySavedCredentials.username) {
          const persistCredentials = await confirm({
            title: 'Soll deine Matrikelnummer für\'s nächste mal auf diesem Gerät gespeichert werden?',
            content: 'Wenn du nein sagst, ist das auch nicht schlimm.',
            okText: 'Jo, kein Ding',
            cancelText: 'Wehe',
          });

          if (persistCredentials) {
            await storeCredentials(values.username);
          }
        }

        const calendarIntegrationActive = await ensureCalendarIntegration();

        if (calendarIntegrationActive) {
          const calendarUrl = await getEkvvCalendarUrl();
          const ical = await getCalendarEvents(calendarUrl);
          const events = parseCalendar(ical);

          if (events === null) {
            Modal.warning({
              title: 'Dein Stundenplan ist leer.',
              content: 'Du hast dich für keinen einzigen Kurs angemeldet.',
              okText: 'Ok und abbrechen',
            });

            setIsLoading(false);

            return;
          }

          await storeCalendarData(calendarUrl);
          await storeEvents(events);

          setIsLoading(false);
          dispatch(setEvents, [events]);

          return;
        }
      }

      setIsLoading(false);
    }
    catch (error) {
      if (error instanceof InvalidCredentials) {
        form.setFields([
          {
            name: 'username',
            errors: ['Matrikelnummer oder Passwort falsch'],
          },
        ]);
      }
      else if (error instanceof LoginFailed) {
        message.error('Irgendetwas ist beim Login schiefgelaufen und es tut mir Leid :(');
      }
      else {
        message.error(error);
      }

      setIsLoading(false);
    }
  }, [dispatch, form]);

  useEffect(() => {
    fetchCredentials().then((credentials) => {
      if (typeof credentials != 'undefined') {
        form.setFieldsValue({
          username: credentials.username,
        });
      }
    });
  }, [form]);

  return (
    <Card title="Login">
      <p>Logge dich mit deinen eKVV-Login-Daten ein.</p>

      <LoginForm form={form} onFinish={handleFinish} isLoading={isLoading}/>
    </Card>
  );
}
