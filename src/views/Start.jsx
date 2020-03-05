import {
  Button,
  Card,
  Form,
  Input,
} from 'antd';
import { setEvents } from 'app/actions/schedule';
import { fetchAndPersistCalendar } from 'app/utils/calendar';
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
      const events = await fetchAndPersistCalendar(url);

      if (events !== null) {
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
