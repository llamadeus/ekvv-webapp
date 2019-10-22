import { createSelector } from 'reselect';


/**
 * Get the router state.
 *
 * @param {Object} state
 * @returns {*}
 */
const getRouter = state => state.router;

/**
 * Get the current location object.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getLocation = createSelector(
  [getRouter],
  router => router.location,
);

/**
 * Get the current location pathname.
 *
 * @param {Object} state
 * @returns {string}
 */
export const getPathname = createSelector(
  [getLocation],
  schedule => schedule.pathname,
);
