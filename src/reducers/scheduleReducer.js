import {
  resetRequestedDay,
  setEvents,
  setRequestedDay,
  setSelectedDay,
  setSelectedWeek,
} from 'app/actions/schedule';
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
  case setSelectedWeek:
    return state.set('selectedWeek', payload.week);

  case setSelectedDay:
    return state.set('selectedDay', payload.day);

  case setRequestedDay:
    return state.set('requestedDay', payload.day);

  case resetRequestedDay:
    return state.set('requestedDay', null);

  case setEvents:
    return state.set('events', mapByKey(payload.events, 'uid'));

  default:
    return state;
  }
}
