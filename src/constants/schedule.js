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
  LOAD_CALENDAR: 'LOAD_CALENDAR',
  RELOAD_CALENDAR: 'RELOAD_CALENDAR',
};

/**
 * Days of the weak.
 *
 * @type {{WEDNESDAY: symbol, MONDAY: symbol, THURSDAY: symbol, TUESDAY: symbol, FRIDAY: symbol}}
 */
export const DAYS = {
  MONDAY: Symbol('MONDAY'),
  TUESDAY: Symbol('TUESDAY'),
  WEDNESDAY: Symbol('WEDNESDAY'),
  THURSDAY: Symbol('THURSDAY'),
  FRIDAY: Symbol('FRIDAY'),
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
