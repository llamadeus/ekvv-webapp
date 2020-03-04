import { createScopedActions } from 'app/utils/redux';


/**
 * Scope.
 *
 * @type {string}
 */
export const SCOPE = 'ui';

/**
 * Redux actions.
 *
 * @type {*}
 */
export const ACTIONS = createScopedActions(SCOPE, {
  SET_LOADING_STATE: 'SET_LOADING_STATE',
  SET_SCROLL_TO_DAY: 'SET_SCROLL_TO_DAY',
});
