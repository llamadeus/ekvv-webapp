import { ACTIONS } from 'app/constants/schedule';
import { mapByKey } from 'app/utils/redux';
import {
  clampMomentInstanceToWeekdays,
  getDayByMomentInstance,
} from 'app/utils/schedule';
import { fromJS } from 'immutable';
import moment from 'moment';


/**
 * Initial state.
 *
 * @returns {Immutable.Map}
 */
const initialState = () => fromJS({
  selectedWeek: moment().startOf('week'),
  selectedDay: getDayByMomentInstance(clampMomentInstanceToWeekdays(moment())),
  requestedDay: null,
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
  case ACTIONS.SET_SELECTED_WEEK:
    return state.set('selectedWeek', payload.week);

  case ACTIONS.SET_SELECTED_DAY:
    return state.set('selectedDay', payload.day);

  case ACTIONS.SET_REQUESTED_DAY:
    return state.set('requestedDay', payload.day);

  case ACTIONS.RESET_REQUESTED_DAY:
    return state.set('requestedDay', null);

  case ACTIONS.SET_EVENTS:
    return state.set('events', mapByKey(payload.events, 'uid'));

  default:
    return state;
  }
}
