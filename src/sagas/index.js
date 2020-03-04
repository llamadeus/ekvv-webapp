import scheduleSaga from 'app/sagas/scheduleSaga';
import {
  all,
  fork,
} from 'redux-saga/effects';


/**
 * Root saga.
 *
 * @returns {IterableIterator<*>}
 */
export default function* rootSaga() {
  yield all([
    fork(scheduleSaga),
  ]);
}
