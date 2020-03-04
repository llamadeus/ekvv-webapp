import {
  Button,
  Card,
  Form,
  Input,
  Modal,
} from 'antd';
import { setEvents } from 'app/actions/schedule';
import { KEYS } from 'app/constants/keyval';
import database from 'app/database';
import { parseCalendar } from 'app/utils/calendar';
import keyval from 'app/utils/keyval';
import React, {
  useCallback,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';


/**
 * Start component
 *
 * @returns {*}
 */
export default function Start() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleFinish = useCallback(async (values) => {
    const { url } = values;

    setIsLoading(true);

    try {
      const proxiedUrl = url.replace('https://ekvv.uni-bielefeld.de', '/api');
      const response = await fetch(proxiedUrl);
      const ical = await response.text();
      const events = parseCalendar(ical);

      if (events === null) {
        Modal.warning({
          title: 'Dein Stundenplan ist leer.',
          content: 'Du hast dich entweder für keine Kurse angemeldet oder die URL zu deinem persönlichen Kalendar ist falsch.',
          okText: 'Ok und abbrechen',
        });
      }
      else {
        await keyval.set(KEYS.ICAL_URL, url);
        await keyval.set(KEYS.ICAL_RAW, ical);

        await database.events.clear();
        await database.events.bulkPut(events);

        setIsLoading(false);
        dispatch(setEvents(events));
      }
    }
    catch {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <Card title="Stundenplan laden">
      <p>Füge die URL zu deinem persönlichen Kalender ein, um deinen Stundenplan zu laden.</p>

      <Form onFinish={handleFinish} hideRequiredMark>
        <Form.Item
          name="url"
          validateTrigger={false}
          rules={[
            {
              required: true,
              message: 'Ohne geht nicht...',
            }, {
              pattern: /^https:\/\/ekvv\.uni-bielefeld\.de\/ws\/calendar\?token=[a-zA-Z0-9]+$/,
              message: 'Ungültiges Format',
            },
          ]}
        >
          <Input placeholder="https://ekvv.uni-bielefeld.de/ws/calendar?token=XYZ"/>
        </Form.Item>

        <Form.Item className="tw-text-right">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Los!
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
