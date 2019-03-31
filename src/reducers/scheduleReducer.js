import { fromJS } from 'immutable';
import {
  ACTIONS,
  DAYS,
} from '../constants/schedule';


/**
 * Initial state.
 *
 * @returns {Immutable.Map}
 */
const initialState = () => fromJS({
  selectedDay: DAYS.MONDAY,
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

  default:
    return state;
  }
}
