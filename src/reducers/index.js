import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import uiReducer from './uiReducer';


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
    ui: uiReducer,
  });
}
