import { DAY_OFFSETS } from 'app/constants/schedule';
import { getArg } from 'app/utils/reselect';
import moment from 'moment';
import { createSelector } from 'reselect';
import { RRule } from 'rrule';


/**
 * Get the schedule state.
 *
 * @param {Object} state
 * @returns {*}
 */
const getSchedule = state => state.schedule;

/**
 * Get the currently selected week.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getSelectedWeek = createSelector(
  [getSchedule],
  schedule => schedule.get('selectedWeek'),
);

/**
 * Get the currently selected day.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getSelectedDay = createSelector(
  [getSchedule],
  schedule => schedule.get('selectedDay'),
);

/**
 * Get the requested day.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getRequestedDay = createSelector(
  [getSchedule],
  schedule => schedule.get('requestedDay'),
);

/**
 * Get all events.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getEvents = createSelector(
  [getSchedule],
  schedule => schedule.get('events'),
);

/**
 * Get all events sorted by their start.
 *
 * @param {Object} state
 * @returns {*}
 */
export const getEventsSorted = createSelector(
  [getSchedule],
  schedule => schedule.get('events').sort((a, b) => {
    const durationA = a.get('end') - a.get('start');
    const durationB = b.get('end') - b.get('start');

    return durationB - durationA;
  }),
);

/**
 * Get all events for the currently selected day.
 *
 * @param {Object} state
 * @param {string} day
 * @returns {*}
 */
export const getEventsForDay = createSelector(
  [getEventsSorted, getSelectedWeek, getArg],
  (events, week, day) => events.filter((event) => {
    const dayOfWeek = week.clone().add(DAY_OFFSETS[day], 'day');
    const start = moment(event.get('start')).format('YYYYMMDD\\THHmmss\\Z');
    const rrule = event.get('rrule');
    let ruleString = `DTSTART:${start}`;

    if (typeof rrule != 'undefined') {
      ruleString += `;\nRRULE:${rrule}`;
    }

    const rule = RRule.fromString(ruleString);
    const eventsAtDay = rule.between(
      dayOfWeek.toDate(),
      dayOfWeek.clone().endOf('day').toDate(),
    );

    return eventsAtDay.length > 0;
  }),
);
