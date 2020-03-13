/**
 * Set the selected week.
 *
 * @param week
 * @returns {{week: *}}
 */
export const setSelectedWeek = week => ({
  week,
});

/**
 * Set the selected day.
 *
 * @param day
 * @returns {{day: *}}
 */
export const setSelectedDay = day => ({
  day,
});

/**
 * Set the requested day.
 *
 * @param day
 * @returns {{day: *}}
 */
export const setRequestedDay = day => ({
  day,
});

/**
 * Reset the requested day.
 *
 * @returns {{}}
 */
export const resetRequestedDay = () => ({});

/**
 * Set events.
 *
 * @param events
 * @returns {{events: *}}
 */
export const setEvents = events => ({
  events,
});
