import { put } from 'redux-saga/effects';
import { setEvents } from '../actions/schedule';
import { KEYS } from '../constants/keyval';
import database from '../database';
import keyval from '../utils/keyval';


/**
 * Store the given calendar data.
 *
 * @param url
 * @param ical
 * @param events
 * @returns {IterableIterator<*>}
 */
export function* storeCalendarData(url, ical, events) {
  yield keyval.set(KEYS.ICAL_URL, url);
  yield keyval.set(KEYS.ICAL_RAW, ical);

  if (Array.isArray(events)) {
    yield database.events.bulkPut(events);
  }
}

/**
 * Clear calendar data and saved events.
 *
 * @returns {IterableIterator<*>}
 */
export function* clearCalendarData() {
  yield keyval.delete(KEYS.ICAL_URL);
  yield keyval.delete(KEYS.ICAL_RAW);
  yield database.events.clear();
}

/**
 * Load all events from the database.
 *
 * @returns {IterableIterator<*>}
 */
export function* loadEvents() {
  const events = yield database.events.toArray();

  yield put(setEvents(events));
}
