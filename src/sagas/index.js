import {
  all,
  fork,
  put,
} from 'redux-saga/effects';
import { setEvents } from '../actions/schedule';
import { setInitialized } from '../actions/ui';
import { KEYS } from '../constants/keyval';
import keyval from '../utils/keyval';
import scheduleSaga from './scheduleSaga';
import database from '../database';


/**
 * Initialize the app state.
 *
 * @returns {IterableIterator<*>}
 */
function* initializeApp() {
  if (yield keyval.has(KEYS.ICAL_URL)) {
    const events = yield database.events.toArray();

    yield put(setEvents(events));
  }

  yield put(setInitialized());
}

/**
 * Root saga.
 *
 * @returns {IterableIterator<*>}
 */
export default function* rootSaga() {
  yield all([
    fork(initializeApp),
    fork(scheduleSaga),
  ]);
}
