import { setEvents } from 'app/actions/schedule';
import { KEYS } from 'app/constants/keyval';
import database from 'app/database';
import keyval from 'app/utils/keyval';
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
      if (await keyval.has(KEYS.ICAL_URL)) {
        const events = await database.events.toArray();

        dispatch(setEvents(events));
      }

      setInitialized(true);
    }

    // noinspection JSIgnoredPromiseFromCall
    initialize();
  }, [dispatch]);

  return initialized;
}
