import {
  DAY_OFFSETS,
  DAYS,
  DAYS_SORTED,
} from 'app/constants/schedule';
import moment from 'moment';


/**
 * Get the day index for the given day.
 *
 * @param day
 * @returns {number}
 */
export function getIndexByDay(day) {
  return DAYS_SORTED.findIndex(key => DAYS[key] === day);
}

/**
 * Get the day by the given index.
 *
 * @param index
 * @returns {symbol}
 */
export function getDayByIndex(index) {
  return Object.getOwnPropertySymbols(DAY_OFFSETS).find(key => DAY_OFFSETS[key] === index);
}

/**
 * Get day symbol by an moment instance.
 *
 * @param momentInstance
 * @returns {symbol}
 */
export function getDayByMomentInstance(momentInstance) {
  return getDayByIndex(momentInstance.day() - 1);
}

/**
 * Create a moment instance from the given week and day symbol.
 *
 * @param week
 * @param day
 * @returns {moment.Moment}
 */
export function getMomentInstanceByDay(week, day) {
  return moment(week)
    .startOf('week')
    .add(getIndexByDay(day), 'days');
}

/**
 * Clamp moment instance to be a weekday.
 * Guaranteed.
 *
 * @param momentInstance
 * @returns {moment.Moment}
 */
export function clampMomentInstanceToWeekdays(momentInstance) {
  const day = momentInstance.day();

  return day === 0 || day === 6
    ? moment(momentInstance).day(day === 0 ? -2 : 5)
    : momentInstance;
}
