import { ACTIONS } from '../constants/ui';


/**
 * Mark the app as initialized.
 *
 * @returns {{type: string}}
 */
export const setInitialized = () => ({
  type: ACTIONS.SET_INITIALIZED,
});

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
