import { createSelector } from 'reselect';


/**
 * Get the schedule state.
 *
 * @param state
 * @returns {*}
 */
const getSchedule = state => state.schedule;

/**
 * Get all events.
 *
 * @returns {*}
 */
export const getEvents = createSelector(
  [getSchedule],
  schedule => schedule.get('events'),
);

/**
 * Get the currently selected day.
 *
 * @returns {*}
 */
export const getSelectedDay = createSelector(
  [getSchedule],
  schedule => schedule.get('selectedDay'),
);
