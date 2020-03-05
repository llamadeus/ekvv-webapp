import { Modal } from 'antd';
import { KEYS } from 'app/constants/keyval';
import database from 'app/database';
import keyval from 'app/utils/keyval';
import ical2json from 'ical2json';
import moment from 'moment';


/**
 * Parse the given iCalendar.
 *
 * @param ical
 * @returns {*}
 */
export function parseCalendar(ical) {
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
 * Fetch the given ekvv calendar.
 *
 * @param url
 * @returns {Promise<string>}
 */
export async function fetchCalendar(url) {
  const proxiedUrl = url.replace('https://ekvv.uni-bielefeld.de', '/api');
  const response = await fetch(proxiedUrl);

  return response.text();
}

/**
 * Fetch and persist the given ekvv calendar.
 *
 * @param url
 * @returns {Promise<*>}
 */
export async function fetchAndPersistCalendar(url) {
  const ical = await fetchCalendar(url);
  const events = parseCalendar(ical);

  if (events === null) {
    Modal.warning({
      title: 'Dein Stundenplan ist leer.',
      content: 'Du hast dich entweder für keine Kurse angemeldet oder die URL zu deinem persönlichen Kalendar ist falsch.',
      okText: 'Ok und abbrechen',
    });
  }
  else {
    await keyval.set(KEYS.ICAL_URL, url);
    await keyval.set(KEYS.ICAL_RAW, ical);

    await database.events.clear();
    await database.events.bulkPut(events);
  }

  return events;
}
