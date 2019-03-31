import {
  all,
  fork,
  put,
} from 'redux-saga/effects';
import { setEvents } from '../actions/schedule';
import { setInitialized } from '../actions/ui';
import database from '../database';
import scheduleSaga from './scheduleSaga';


/**
 * Initialize the app state.
 *
 * @returns {IterableIterator<*>}
 */
function* initializeApp() {
  const events = yield database.events.toArray();

  yield put(setEvents(events));
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
