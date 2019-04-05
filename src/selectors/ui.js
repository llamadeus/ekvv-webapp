import { createSelector } from 'reselect';


/**
 * Get the ui state.
 *
 * @param state
 * @returns {*}
 */
const getUi = state => state.ui;

/**
 * Get initialized state.
 *
 * @returns {*}
 */
export const getInitialized = createSelector(
  [getUi],
  schedule => schedule.get('initialized'),
);

/**
 * Get is loading state.
 *
 * @returns {*}
 */
export const getIsLoading = createSelector(
  [getUi],
  schedule => schedule.get('isLoading'),
);

/**
 * Get the "scroll to day" flag.
 *
 * @returns {*}
 */
export const getScrollToDay = createSelector(
  [getUi],
  schedule => schedule.get('scrollToDay'),
);
