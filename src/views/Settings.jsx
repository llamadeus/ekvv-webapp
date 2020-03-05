import {
  Button,
  Card,
  Form,
  message,
} from 'antd';
import { setEvents } from 'app/actions/schedule';
import CardBlock from 'app/components/CardBlock';
import FeedbackModal from 'app/components/FeedbackModal';
import Footer from 'app/components/Footer';
import { KEYS } from 'app/constants/keyval';
import { fetchAndPersistCalendar } from 'app/utils/calendar';
import keyval from 'app/utils/keyval';
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
    const calendarUrl = await keyval.get(KEYS.ICAL_URL);

    if (typeof calendarUrl == 'undefined') {
      return;
    }

    setIsLoading(true);

    try {
      const events = await fetchAndPersistCalendar(calendarUrl);

      if (events !== null) {
        dispatch(setEvents(events));

        message.success('Dein Stundenplan wurde aktualisiert!');
      }
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
