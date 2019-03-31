import {
  all,
  call,
  fork,
  put,
} from 'redux-saga/effects';
import { setInitialized } from '../actions/ui';
import { KEYS } from '../constants/keyval';
import keyval from '../utils/keyval';
import { loadEvents } from './database';
import scheduleSaga from './scheduleSaga';


/**
 * Initialize the app state.
 *
 * @returns {IterableIterator<*>}
 */
function* initializeApp() {
  if (yield keyval.has(KEYS.ICAL_URL)) {
    yield call(loadEvents);
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
