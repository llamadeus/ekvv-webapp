import { createSelector } from 'reselect';


/**
 * Get the router state.
 *
 * @param state
 * @returns {*}
 */
const getRouter = state => state.router;

/**
 * Get the current location object.
 *
 * @returns {*}
 */
export const getLocation = createSelector(
  [getRouter],
  router => router.location,
);

/**
 * Get the current location pathname.
 *
 * @returns {string}
 */
export const getPathname = createSelector(
  [getLocation],
  schedule => schedule.pathname,
);
