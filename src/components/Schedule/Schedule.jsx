import EventContainer from 'app/components/EventContainer';
import ScheduleGrid from 'app/components/ScheduleGrid';
import { DAY_OFFSETS } from 'app/constants/schedule';
import { Moment } from 'app/prop-types';
import { getEventsForDay } from 'app/selectors/schedule';
import { DayShape } from 'app/shapes/schedule';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';


/**
 * Start time of the schedule.
 *
 * @type {number}
 */
const SCHEDULE_START = 8;

/**
 * End time of the schedule.
 *
 * @type {number}
 */
const SCHEDULE_END = 20;

/**
 * Schedule component
 *
 * @param props
 * @returns {*}
 */
export default function Schedule(props) {
  const { week, day } = props;
  const events = useSelector(state => getEventsForDay(state, day));
  const date = moment(week).add(DAY_OFFSETS[day], 'days');

  return (
    <div className={styles.root}>
      <ScheduleGrid
        start={SCHEDULE_START}
        end={SCHEDULE_END}
        showTimeIndicator={date.isSame(moment(), 'day')}
      />

      <EventContainer
        events={events}
        start={SCHEDULE_START}
        end={SCHEDULE_END}
      />
    </div>
  );
}

Schedule.propTypes = {
  week: Moment.isRequired,
  day: DayShape.isRequired,
};
