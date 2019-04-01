import { fromJS } from 'immutable';
import moment from 'moment';
import {
  ACTIONS,
  DAYS,
  DAYS_OFFSETS,
} from '../constants/schedule';
import { mapByKey } from '../utils/redux';


/**
 * Determine the initially selected day.
 *
 * @returns {string}
 */
function determineSelectedDay() {
  const dayIndex = moment().day();
  const day = Object.keys(DAYS_OFFSETS).find(key => dayIndex - 1 === DAYS_OFFSETS[key]);

  return typeof day == 'undefined'
    ? DAYS.MONDAY
    : day;
}

/**
 * Initial state.
 *
 * @returns {Immutable.Map}
 */
const initialState = () => fromJS({
  selectedWeek: moment().startOf('week'),
  selectedDay: determineSelectedDay(),
  events: null,
});

/**
 * Schedule reducer.
 *
 * @param state
 * @param action
 * @returns {Immutable.Map}
 */
export default function scheduleReducer(state = initialState(), { type, payload }) {
  switch (type) {
  case ACTIONS.SET_SELECTED_DAY:
    return state.set('selectedDay', payload.day);

  case ACTIONS.SET_EVENTS:
    return state.set('events', mapByKey(payload.events, 'uid'));

  default:
    return state;
  }
}
