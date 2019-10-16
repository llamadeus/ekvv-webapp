import {
  message,
  Modal,
} from 'antd';
import ical2json from 'ical2json';
import moment from 'moment';
import {
  all,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { setSelectedDay } from '../actions/schedule';
import { setLoadingState } from '../actions/ui';
import { KEYS } from '../constants/keyval';
import { EFFECTS } from '../constants/schedule';
import { transitionTo } from '../effects/saga';
import { getPathname } from '../selectors/router';
import { getSelectedWeek } from '../selectors/schedule';
import keyval from '../utils/keyval';
import { getDayByMomentInstance } from '../utils/schedule';
import {
  clearCalendarData,
  loadEvents,
  storeCalendarData,
} from './database';


/**
 * Load the calendar from the given url.
 *
 * @param url
 * @returns {IterableIterator<*>}
 */
function* loadCalendarFromUrl(url) {
  const proxiedUrl = url.replace('https://ekvv.uni-bielefeld.de', '/api');
  const request = yield call(fetch, proxiedUrl);

  return yield request.text();
}

/**
 * Parse the given iCalendar.
 *
 * @param ical
 * @returns {*}
 */
function parseCalendar(ical) {
  const calendar = ical2json.convert(ical);
  const vCalendar = calendar.VCALENDAR;
  const vEvents = Array.isArray(vCalendar) && vCalendar.length === 1
    ? (vCalendar[0].VEVENT || [])
    : [];

  if (vEvents.length === 0) {
    return null;
  }

  return vEvents.map(event => ({
    uid: event.UID,
    start: moment(event['DTSTART;TZID=Europe/Berlin']).toDate(),
    end: moment(event['DTEND;TZID=Europe/Berlin']).toDate(),
    description: event.DESCRIPTION,
    location: event.LOCATION,
    rrule: event.RRULE,
    summary: event.SUMMARY,
    url: event.URL,
    raw: event,
  }));
}

/**
 * Does pretty much what the function name suggests.
 *
 * @param url
 * @returns {IterableIterator<*>}
 */
function* fetchAndPersistCalendar(url) {
  const ical = yield call(loadCalendarFromUrl, url);
  const events = yield call(parseCalendar, ical);

  if (events === null) {
    Modal.warning({
      title: 'Dein Stundenplan ist leer.',
      content: 'Du hast dich entweder für keine Kurse angemeldet oder die URL zu deinem persönlichen Kalendar ist falsch.',
      okText: 'Ok und abbrechen',
    });
  }
  else {
    yield call(clearCalendarData);
    yield call(storeCalendarData, url, ical, events);
    yield call(loadEvents);
  }
}

/**
 * Load the schedule from the given calendar url.
 *
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* handleLoadCalendar({ payload }) {
  yield put(setLoadingState(true));

  try {
    const { url } = payload;

    yield call(fetchAndPersistCalendar, url);
  }
  finally {
    yield put(setLoadingState(false));
  }
}

/**
 * Reload the calendar data if a url was given.
 *
 * @returns {IterableIterator<*>}
 */
function* handleReloadCalendar() {
  const calendarUrl = yield keyval.get(KEYS.ICAL_URL);

  if (typeof calendarUrl == 'undefined') {
    return;
  }

  yield put(setLoadingState(true));

  try {
    yield call(fetchAndPersistCalendar, calendarUrl);

    message.success('Dein Stundenplan wurde aktualisiert!');
  }
  finally {
    yield put(setLoadingState(false));
  }
}

/**
 * Scroll to today, if we are in today's week.
 *
 * @returns {IterableIterator<*>}
 */
function* handleShowToday() {
  const pathname = yield select(getPathname);

  if (pathname !== '/') {
    yield put(transitionTo('/'));
  }
  else {
    const selectedWeek = yield select(getSelectedWeek);
    const today = moment();

    if (today.isSame(selectedWeek, 'week')) {
      const day = getDayByMomentInstance(today);

      yield put(setSelectedDay(day));
    }
  }
}

/**
 * Schedule saga.
 *
 * @returns {IterableIterator<*>}
 */
export default function* scheduleSaga() {
  yield all([
    takeEvery(EFFECTS.LOAD_CALENDAR, handleLoadCalendar),
    takeEvery(EFFECTS.RELOAD_CALENDAR, handleReloadCalendar),
    takeEvery(EFFECTS.SHOW_TODAY, handleShowToday),
  ]);
}
