import { put } from 'redux-saga/effects';
import { setEvents } from '../actions/schedule';
import database from '../database';


/**
 * Load all events from the database.
 *
 * @returns {IterableIterator<*>}
 */
export function* loadEvents() {
  const events = yield database.events.toArray();

  yield put(setEvents(events));
}
