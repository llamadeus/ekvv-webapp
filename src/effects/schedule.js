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
