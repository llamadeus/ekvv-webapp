import EventContainer from 'app/components/EventContainer';
import ScheduleGrid from 'app/components/ScheduleGrid';
import { getEventsForDay } from 'app/selectors/schedule';
import { mapStateToProps } from 'app/utils/redux';
import ImmutablePropTypes from 'immutable-prop-types';
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
    events: ImmutablePropTypes.map.isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div className={styles.root}>
        <ScheduleGrid
          start={SCHEDULE_START}
          end={SCHEDULE_END}
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
