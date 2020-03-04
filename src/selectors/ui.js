import { createSelector } from 'reselect';


/**
 * Get the ui state.
 *
 * @param {Object} state
 * @returns {*}
 */
const getUi = state => state.ui;

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
