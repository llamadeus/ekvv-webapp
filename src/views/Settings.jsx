import {
  Button,
  Card,
  Form,
  message,
} from 'antd';
import { setEvents } from 'app/actions/schedule';
import { getCalendarEvents } from 'app/api/ekvv/calendar';
import CardBlock from 'app/components/CardBlock';
import FeedbackModal from 'app/components/FeedbackModal';
import Footer from 'app/components/Footer';
import {
  fetchCalendarUrl,
  storeCalendarData,
  storeEvents,
} from 'app/database/ekvv/events';
import { parseCalendar } from 'app/utils/calendar';
import React, {
  useCallback,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';


/**
 * Settings component
 *
 * @returns {*}
 */
export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const handleReloadCalendar = useCallback(async () => {
    const calendarUrl = await fetchCalendarUrl();

    if (typeof calendarUrl == 'undefined') {
      return;
    }

    setIsLoading(true);

    try {
      const ical = await getCalendarEvents(calendarUrl);
      const events = parseCalendar(ical);

      if (events !== null) {
        await storeCalendarData(calendarUrl);
        await storeEvents(events);

        dispatch(setEvents, [events]);

        message.success('Dein Stundenplan wurde aktualisiert!');
      }
    }
    catch (error) {
      message.error(error);
    }
    finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <>
      <Card title="Stundenplan">
        <CardBlock>
          <p>Lade deinen Stundenplan neu.</p>

          <Form.Item className="tw-text-right">
            <Button type="primary" onClick={handleReloadCalendar} loading={isLoading}>
              Stundenplan aktualisieren
            </Button>
          </Form.Item>
        </CardBlock>
      </Card>

      <Card title="Allgemein" className="tw-mt-6">
        <CardBlock>
          <p>Aktualisiere auf die neueste Version.</p>

          <Form.Item className="tw-text-right">
            <Button type="primary" onClick={() => window.location.reload(true)}>
              App aktualisieren
            </Button>
          </Form.Item>
        </CardBlock>

        <CardBlock>
          <p>
            Du hast Verbesserungsvorschläge oder willst mir einfach nur eine liebe Nachricht hinterlassen? Schreib mir!
          </p>

          <Form.Item className="tw-text-right">
            <Button type="primary" onClick={() => setShowFeedbackModal(true)}>
              Feedback senden
            </Button>
          </Form.Item>
        </CardBlock>
      </Card>

      <Footer/>

      <FeedbackModal
        visible={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
    </>
  );
}
