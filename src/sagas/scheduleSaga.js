import ical2json from 'ical2json';
import { Modal } from 'antd';
import moment from 'moment';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { setSelectedDay } from '../actions/schedule';
import {
  setLoadingState,
  setScrollToDay,
} from '../actions/ui';
import { KEYS } from '../constants/keyval';
import { EFFECTS } from '../constants/schedule';
import database from '../database';
import keyval from '../utils/keyval';
import { loadEvents } from './database';


/**
 * Load the calendar
 *
 * @param url
 * @param text
 * @returns {IterableIterator<*>}
 */
function* loadCalendar(url, text) {
  const calendar = ical2json.convert(text);
  const vCalendar = calendar.VCALENDAR;
  const vEvents = Array.isArray(vCalendar) && vCalendar.length === 1
    ? (vCalendar[0].VEVENT || [])
    : [];

  if (vEvents.length === 0) {
    Modal.warning({
      title: 'Dein Stundenplan ist leer.',
      content: 'Du hast dich entweder für keine Kurse angemeldet oder die URL zu deinem persönlichen Kalendar ist falsch.',
      okText: 'Ok und abbrechen',
    });

    return false;
  }

  yield database.events.bulkPut(vEvents.map(event => ({
    uid: event.UID,
    start: moment(event['DTSTART;TZID=Europe/Berlin']).toDate(),
    end: moment(event['DTEND;TZID=Europe/Berlin']).toDate(),
    description: event.DESCRIPTION,
    location: event.LOCATION,
    rrule: event.RRULE,
    summary: event.SUMMARY,
    url: event.URL,
    raw: event,
  })));

  return true;
}

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
    const success = yield call(loadCalendar, payload.url, text);

    if (success) {
      yield keyval.set(KEYS.ICAL_URL, url);
      yield keyval.set(KEYS.ICAL_RAW, text);

      yield call(loadEvents);
    }
  }
  finally {
    yield put(setLoadingState(false));
  }
}

/**
 * Set the selected day and scroll it into view.
 *
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* handleSetSelectedDayAndScroll({ payload }) {
  yield put(setScrollToDay(true));
  yield put(setSelectedDay(payload.day));
}

/**
 * Schedule saga.
 *
 * @returns {IterableIterator<*>}
 */
export default function* scheduleSaga() {
  yield all([
    takeEvery(EFFECTS.LOAD_SCHEDULE, handleLoadSchedule),
    takeEvery(EFFECTS.SET_SELECTED_DAY_AND_SCROLL, handleSetSelectedDayAndScroll),
  ]);
}
