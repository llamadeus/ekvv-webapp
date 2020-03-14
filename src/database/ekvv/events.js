import { KEYS } from 'app/constants/keyval';
import database from 'app/database';
import keyval from 'app/utils/keyval';


/**
 * Store the given calendar url and ical data.
 *
 * @param url
 * @param ical
 * @returns {Promise<void>}
 */
export async function storeCalendarData(url, ical) {
  await keyval.set(KEYS.ICAL_URL, url);
  await keyval.set(KEYS.ICAL_RAW, ical);
}

/**
 * Store the given events.
 *
 * @param events
 * @returns {Promise<void>}
 */
export async function storeEvents(events) {
  await database.events.clear();
  await database.events.bulkPut(events);
}

/**
 * Fetch the calendar url.
 *
 * @returns {Promise<*|undefined>}
 */
export function fetchCalendarUrl() {
  return keyval.get(KEYS.ICAL_URL);
}

/**
 * Fetch all events.
 *
 * @returns {*}
 */
export function fetchEvents() {
  return database.events.toArray();
}
