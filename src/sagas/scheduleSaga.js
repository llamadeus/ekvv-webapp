import {
  message,
  Modal,
} from 'antd';
import { setLoadingState } from 'app/actions/ui';
import { KEYS } from 'app/constants/keyval';
import { EFFECTS } from 'app/constants/schedule';
import {
  clearCalendarData,
  loadEvents,
  storeCalendarData,
} from 'app/sagas/database';
import { parseCalendar } from 'app/utils/calendar';
import keyval from 'app/utils/keyval';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';


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
 * Schedule saga.
 *
 * @returns {IterableIterator<*>}
 */
export default function* scheduleSaga() {
  yield all([
    takeEvery(EFFECTS.RELOAD_CALENDAR, handleReloadCalendar),
  ]);
}
