import { createSelector } from 'reselect';


/**
 * Get the ui state.
 *
 * @param state
 * @returns {*}
 */
const getUi = state => state.ui;

/**
 * Get is loading state.
 *
 * @returns {*}
 */
export const getIsLoading = createSelector(
  [getUi],
  schedule => schedule.get('isLoading'),
);
