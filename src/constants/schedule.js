/**
 * Days of the week (sorted).
 *
 * @type {*[]}
 */
export const DAYS_SORTED = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

/**
 * Days of the weak.
 *
 * @type {{MONDAY: symbol, TUESDAY: symbol, WEDNESDAY: symbol, THURSDAY: symbol, FRIDAY: symbol}}
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
export const DAY_LABELS = {
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
export const DAY_OFFSETS = {
  [DAYS.MONDAY]: 0,
  [DAYS.TUESDAY]: 1,
  [DAYS.WEDNESDAY]: 2,
  [DAYS.THURSDAY]: 3,
  [DAYS.FRIDAY]: 4,
};

/**
 * Padding around each event.
 *
 * @type {number}
 */
export const EVENT_PADDING = 1;

/**
 * Quarters per minute.
 *
 * @type {number}
 */
export const QUARTERS_PER_HOUR = 4;

/**
 * Minutes per quarter.
 *
 * @type {number}
 */
export const MINUTES_PER_QUARTER = 15;
