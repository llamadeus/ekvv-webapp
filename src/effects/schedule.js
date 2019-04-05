import { EFFECTS } from '../constants/schedule';


/**
 * Load the schedule from the given calendar url.
 *
 * @param url
 * @returns {{payload: {url: *}, type: string}}
 */
export const loadSchedule = url => ({
  type: EFFECTS.LOAD_SCHEDULE,
  payload: {
    url,
  },
});

/**
 * Set the selected day and scroll into view.
 *
 * @param day
 * @returns {{payload: {day: *}, type: string}}
 */
export const setSelectedDayAndScroll = day => ({
  type: EFFECTS.SET_SELECTED_DAY_AND_SCROLL,
  payload: {
    day,
  },
});
