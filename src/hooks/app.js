import { setEvents } from 'app/actions/schedule';
import {
  fetchCalendarUrl,
  fetchEvents,
} from 'app/database/ekvv/events';
import {
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';


/**
 * Load initial data from the local database.
 *
 * @returns {*}
 */
export function useInitialize() {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function initialize() {
      const calendarUrl = await fetchCalendarUrl();

      if (typeof calendarUrl != 'undefined') {
        const events = await fetchEvents();

        dispatch(setEvents, [events]);
      }

      setInitialized(true);
    }

    // noinspection JSIgnoredPromiseFromCall
    initialize();
  }, [dispatch]);

  return initialized;
}
