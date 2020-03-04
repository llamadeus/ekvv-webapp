import { EFFECTS } from 'app/constants/schedule';


/**
 * Reload the calendar.
 *
 * @returns {{type: string}}
 */
export const reloadCalendar = () => ({
  type: EFFECTS.RELOAD_CALENDAR,
});
