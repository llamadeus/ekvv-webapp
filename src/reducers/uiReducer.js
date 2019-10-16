import { fromJS } from 'immutable';
import { ACTIONS } from 'app/constants/ui';


/**
 * Initial state.
 *
 * @returns {Immutable.Map}
 */
const initialState = () => fromJS({
  initialized: false,
  isLoading: false,
});

/**
 * Ui reducer.
 *
 * @param state
 * @param action
 * @returns {Immutable.Map}
 */
export default function uiReducer(state = initialState(), { type, payload }) {
  switch (type) {
  case ACTIONS.SET_INITIALIZED:
    return state.set('initialized', true);

  case ACTIONS.SET_LOADING_STATE:
    return state.set('isLoading', payload.toggle);

  default:
    return state;
  }
}
