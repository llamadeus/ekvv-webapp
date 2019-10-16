import { ACTIONS } from 'app/constants/schedule';


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

/**
 * Set events.
 *
 * @param events
 * @returns {{payload: {events: *}, type: string}}
 */
export const setEvents = events => ({
  type: ACTIONS.SET_EVENTS,
  payload: {
    events,
  },
});
