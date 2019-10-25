/**
 * Compute the time in minutes.
 *
 * @param hours
 * @param minutes
 * @returns {*}
 */
export function timeToMinutes(hours, minutes) {
  return hours * 60 + minutes;
}

/**
 * Compute the time in minutes from the given moment instance.
 *
 * @param moment
 * @returns {*}
 */
export function momentToMinutes(moment) {
  return timeToMinutes(moment.hours(), moment.minutes());
}
