import scheduleReducer from 'app/reducers/scheduleReducer';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';


/**
 * Create the root reducer.
 *
 * @param history
 * @returns {*}
 */
export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    schedule: scheduleReducer,
  });
}
