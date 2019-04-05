/**
 * Redux actions.
 *
 * @type {*}
 */
export const ACTIONS = {
  SET_SELECTED_DAY: 'SET_SELECTED_DAY',
  SET_EVENTS: 'SET_EVENTS',
};

/**
 * Saga effects.
 *
 * @type {*}
 */
export const EFFECTS = {
  LOAD_SCHEDULE: 'LOAD_SCHEDULE',
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

/**
 * Offsets for the days.
 *
 * @type {*}
 */
export const DAYS_OFFSETS = {
  [DAYS.MONDAY]: 0,
  [DAYS.TUESDAY]: 1,
  [DAYS.WEDNESDAY]: 2,
  [DAYS.THURSDAY]: 3,
  [DAYS.FRIDAY]: 4,
};
