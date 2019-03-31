import { createSelector } from 'reselect';


/**
 * Get the schedule state.
 *
 * @param state
 * @returns {*}
 */
const scheduleSelector = state => state.schedule;

/**
 * Get the currently selected day.
 *
 * @returns {*}
 */
export const getSelectedDay = createSelector(
  [scheduleSelector],
  schedule => schedule.get('selectedDay'),
);
