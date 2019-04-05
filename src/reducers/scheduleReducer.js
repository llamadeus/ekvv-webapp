import { fromJS } from 'immutable';
import moment from 'moment';
import { ACTIONS } from '../constants/schedule';
import { mapByKey } from '../utils/redux';


/**
 * Initial state.
 *
 * @returns {Immutable.Map}
 */
const initialState = () => fromJS({
  selectedWeek: moment().startOf('week'),
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
  case ACTIONS.SET_EVENTS:
    return state.set('events', mapByKey(payload.events, 'uid'));

  default:
    return state;
  }
}
