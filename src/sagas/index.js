import {
  all,
  fork,
} from 'redux-saga/effects';
import scheduleSaga from './scheduleSaga';


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
