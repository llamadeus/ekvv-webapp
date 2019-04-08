import { EFFECTS } from '../constants/schedule';


/**
 * Load the schedule from the given calendar url.
 *
 * @param url
 * @returns {{payload: {url: *}, type: string}}
 */
export const loadCalendar = url => ({
  type: EFFECTS.LOAD_CALENDAR,
  payload: {
    url,
  },
});

/**
 * Reload the calendar.
 *
 * @returns {{type: string}}
 */
export const reloadCalendar = () => ({
  type: EFFECTS.RELOAD_CALENDAR,
});
