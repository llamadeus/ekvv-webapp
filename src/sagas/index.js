import { setInitialized } from 'app/actions/ui';
import { KEYS } from 'app/constants/keyval';
import { withBatching } from 'app/lib/redux-saga-batching';
import { loadEvents } from 'app/sagas/database';
import scheduleSaga from 'app/sagas/scheduleSaga';
import keyval from 'app/utils/keyval';
import {
  all,
  call,
  fork,
  put,
} from 'redux-saga/effects';


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
    fork(withBatching, initializeApp),
    fork(scheduleSaga),
  ]);
}
