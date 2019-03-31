import { ACTIONS } from '../constants/schedule';


/**
 * Set the selected day.
 *
 * @param day
 * @returns {{payload: {day: *}, type: string}}
 */
export const setSelectedDay = day => ({
  type: ACTIONS.SET_SELECTED_DAY,
  payload: {
    day,
  },
});
