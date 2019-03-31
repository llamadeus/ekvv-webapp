/**
 * Redux actions.
 *
 * @type {*}
 */
export const ACTIONS = {
  SET_SELECTED_DAY: 'SET_SELECTED_DAY',
};

/**
 * Days of the weak.
 *
 * @type {{MONDAY: string, TUESDAY: string, WEDNESDAY: string, THURSDAY: string, FRIDAY: string}}
 */
export const DAYS = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
};

/**
 * Labels for the days.
 *
 * @type {*}
 */
export const DAYS_LABELS = {
  [DAYS.MONDAY]: 'Mo',
  [DAYS.TUESDAY]: 'Di',
  [DAYS.WEDNESDAY]: 'Mi',
  [DAYS.THURSDAY]: 'Do',
  [DAYS.FRIDAY]: 'Fr',
};
