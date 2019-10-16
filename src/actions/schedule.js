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
 * Set the requested day.
 *
 * @param day
 * @returns {{payload: {day: *}, type: *}}
 */
export const setRequestedDay = day => ({
  type: ACTIONS.SET_REQUESTED_DAY,
  payload: {
    day,
  },
});

/**
 * Reset the requested day.
 *
 * @returns {{type: *}}
 */
export const resetRequestedDay = () => ({
  type: ACTIONS.RESET_REQUESTED_DAY,
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
