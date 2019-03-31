import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { setLoadingState } from '../actions/ui';
import { EFFECTS } from '../constants/schedule';


/**
 * Load the schedule.
 *
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* handleLoadSchedule({ payload }) {
  yield put(setLoadingState(true));

  try {
    const url = payload.url.replace('https://ekvv.uni-bielefeld.de', '/api');
    const request = yield call(fetch, url);
    const calendar = yield request.text();

    console.log(calendar);
  }
  finally {
    yield put(setLoadingState(false));
  }
}

/**
 * Schedule saga.
 *
 * @returns {IterableIterator<*>}
 */
export default function* scheduleSaga() {
  yield all([
    takeEvery(EFFECTS.LOAD_SCHEDULE, handleLoadSchedule),
  ]);
}
