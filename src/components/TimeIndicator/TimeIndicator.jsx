import Line from 'app/components/ScheduleGrid/Line';
import withAvailableSpace from 'app/hoc/withAvailableSpace';
import { timeToMinutes } from 'app/utils/time';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Number of milliseconds per hour.
 * Note: This number may be different on your planet.
 *
 * @type {number}
 */
const MILLISECONDS_PER_MINUTE = 60 * 1000;

/**
 * Class TimeIndicator
 */
@withAvailableSpace
export default class TimeIndicator extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    availableHeight: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  };

  /**
   * Component state.
   *
   * @type {Object}
   */
  state = {
    now: moment(),
  };

  /**
   * Update timeout.
   *
   * @type {number|null}
   */
  updateTimeout = null;

  /**
   * Start the updater.
   */
  componentDidMount() {
    this.runUpdater();
  }

  /**
   * Stop the updater.
   */
  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  /**
   * Update this component on minute change.
   */
  runUpdater() {
    const { now } = this.state;
    const millisecondsUntilMinuteChange = MILLISECONDS_PER_MINUTE - (now.seconds() * 1000 + now.milliseconds());

    this.updateTimeout = setTimeout(() => {
      this.setState({ now: moment() });

      this.runUpdater();
    }, millisecondsUntilMinuteChange + 1);
  }

  /**
   * Compute the translate per minute.
   *
   * @returns {number}
   */
  computeTranslatePerMinute() {
    const { start, end, availableHeight } = this.props;
    const spanInMinutes = (end - start + 1) * 60;

    return availableHeight / spanInMinutes;
  }

  /**
   * Compute the container style.
   *
   * @returns {{transform: string}}
   */
  computeStyle() {
    const { start } = this.props;
    const { now } = this.state;
    const minutes = timeToMinutes(now.hours() - start, now.minutes());
    const translateY = minutes * this.computeTranslatePerMinute();

    return {
      transform: `translateY(${translateY}px)`,
    };
  }

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const { now } = this.state;

    if (now.hours() < this.props.start || now.hours() > this.props.end) {
      return false;
    }

    return (
      <div
        className={styles.root}
        style={this.computeStyle()}
      >
        <Line
          label={now.format('HH:mm')}
          active
        />
      </div>
    );
  }
}
