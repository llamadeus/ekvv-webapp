import { ACTIONS } from '../constants/schedule';


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
