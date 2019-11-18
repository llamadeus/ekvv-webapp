import {
  Button,
  Card,
  Form,
} from 'antd';
import Footer from 'app/components/Footer';
import { reloadCalendar } from 'app/effects/schedule';
import { getIsLoading } from 'app/selectors/ui';
import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';


/**
 * Settings component
 *
 * @returns {*}
 */
export default function Settings() {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const handleReloadCalendar = useCallback(() => dispatch(reloadCalendar()), [dispatch]);

  return (
    <>
      <Card title="Stundenplan">
        <p>Lade deinen Stundenplan neu.</p>

        <Form.Item className="tw-text-right">
          <Button type="primary" onClick={handleReloadCalendar} loading={isLoading}>
            Stundenplan aktualisieren
          </Button>
        </Form.Item>
      </Card>

      <Card title="Allgemein" className="tw-mt-6">
        <p>Aktualisiere auf die neueste Version.</p>

        <Form.Item className="tw-text-right">
          <Button type="primary" onClick={() => window.location.reload(true)}>
            App aktualisieren
          </Button>
        </Form.Item>
      </Card>

      <Footer/>
    </>
  );
}
