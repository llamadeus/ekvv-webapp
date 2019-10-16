import {
  DAY_OFFSETS,
  DAYS,
} from 'app/constants/schedule';


/**
 * Get the day index for the given day.
 *
 * @param day
 * @returns {number}
 */
export function getIndexByDay(day) {
  return Object.keys(DAYS).findIndex(key => DAYS[key] === day);
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
