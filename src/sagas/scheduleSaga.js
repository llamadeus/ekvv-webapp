import ical2json from 'ical2json';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { setLoadingState } from '../actions/ui';
import { KEYS } from '../constants/keyval';
import { EFFECTS } from '../constants/schedule';
import database from '../database';
import keyval from '../utils/keyval';


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
    const text = yield request.text();
    const calendar = ical2json.convert(text);
    const vCalendar = calendar.VCALENDAR;
    const vEvents = Array.isArray(vCalendar) && vCalendar.length === 1
      ? (vCalendar[0].VEVENT || [])
      : [];

    yield keyval.set(KEYS.ICAL_URL, payload.url);
    yield keyval.set(KEYS.ICAL_RAW, text);

    yield database.events.bulkPut(vEvents.map(event => ({
      uid: event.UID,
      start: event['DTSTART;TZID=Europe/Berlin'],
      rrule: event.RRULE,
      raw: event,
    })));
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