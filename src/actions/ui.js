import { ACTIONS } from 'app/constants/ui';


/**
 * Set the loading state.
 *
 * @param toggle
 * @returns {{payload: {toggle: *}, type: string}}
 */
export const setLoadingState = toggle => ({
  type: ACTIONS.SET_LOADING_STATE,
  payload: {
    toggle,
  },
});
