import ImmutablePropTypes from 'immutable-prop-types';
import React from 'react';
import { getEventsForDay } from '../../selectors/schedule';
import { mapStateToProps } from '../../utils/redux';
import EventContainer from '../EventContainer';
import ScheduleGrid from '../ScheduleGrid';
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
