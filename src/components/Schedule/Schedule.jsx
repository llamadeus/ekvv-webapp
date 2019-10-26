import EventContainer from 'app/components/EventContainer';
import ScheduleGrid from 'app/components/ScheduleGrid';
import { DAY_OFFSETS } from 'app/constants/schedule';
import { Moment } from 'app/prop-types';
import { getEventsForDay } from 'app/selectors/schedule';
import { DayShape } from 'app/shapes/schedule';
import { mapStateToProps } from 'app/utils/redux';
import ImmutablePropTypes from 'immutable-prop-types';
import moment from 'moment';
import React from 'react';
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
 * Class Schedule
 */
@mapStateToProps((state, props) => ({
  events: getEventsForDay(state, props.day),
}))
export default class Schedule extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    // Redux
    events: ImmutablePropTypes.map.isRequired,

    // React
    week: Moment.isRequired,
    day: DayShape.isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const date = moment(this.props.week).add(DAY_OFFSETS[this.props.day], 'days');

    return (
      <div className={styles.root}>
        <ScheduleGrid
          start={SCHEDULE_START}
          end={SCHEDULE_END}
          showTimeIndicator={date.isSame(moment(), 'day')}
        />

        <EventContainer
          events={this.props.events}
          start={SCHEDULE_START}
          end={SCHEDULE_END}
        />
      </div>
    );
  }
}
