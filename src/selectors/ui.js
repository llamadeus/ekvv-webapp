import { createSelector } from 'reselect';


/**
 * Get the ui state.
 *
 * @param {Object} state
 * @returns {*}
 */
const getUi = state => state.ui;

/**
 * Get initialized state.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getInitialized = createSelector(
  [getUi],
  schedule => schedule.get('initialized'),
);

/**
 * Get is loading state.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getIsLoading = createSelector(
  [getUi],
  schedule => schedule.get('isLoading'),
);
