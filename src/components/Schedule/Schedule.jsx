import React from 'react';
import EventContainer from '../EventContainer';
import ScheduleGrid from '../ScheduleGrid';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';


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
export default class Schedule extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
