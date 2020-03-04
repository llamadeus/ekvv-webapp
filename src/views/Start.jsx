import {
  Button,
  Card,
  Form,
  Input,
} from 'antd';
import { loadCalendar } from 'app/effects/schedule';
import { getIsLoading } from 'app/selectors/ui';
import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';


/**
 * Start component
 *
 * @returns {*}
 */
export default function Start() {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const handleFinish = useCallback((values) => {
    dispatch(loadCalendar(values.url));
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
