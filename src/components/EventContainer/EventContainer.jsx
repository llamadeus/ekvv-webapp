import Event from 'app/components/Event';
import ImmutablePropTypes from 'immutable-prop-types';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Padding around each event.
 *
 * @type {number}
 */
const EVENT_PADDING = 1;

/**
 * Quarters per minute.
 *
 * @type {number}
 */
const QUARTERS_PER_HOUR = 4;

/**
 * Minutes per quarter.
 *
 * @type {number}
 */
const MINUTES_PER_QUARTER = 15;

/**
 * Class EventContainer
 */
export default class EventContainer extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    events: ImmutablePropTypes.map.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  };

  /**
   * Compute event positions.
   *
   * @param props
   * @param state
   * @returns {{positions: *}}
   */
  static getDerivedStateFromProps(props, state) {
    const { positions } = state;
    const lanes = [];

    props.events.forEach((event) => {
      const uid = event.get('uid');
      const eventStart = moment(event.get('start'));
      const eventEnd = moment(event.get('end'));
      const startHour = Number(eventStart.format('H'));
      const startQuarter = Math.ceil(Number(eventStart.format('m')) / MINUTES_PER_QUARTER);
      const endHour = Number(eventEnd.format('H'));
      const endQuarter = Math.ceil(Number(eventStart.format('m')) / MINUTES_PER_QUARTER);
      const quarterIndexStart = startHour * QUARTERS_PER_HOUR + startQuarter;
      const quarterIndexEnd = endHour * QUARTERS_PER_HOUR + endQuarter;
      let lanesTotal = 1;
      let laneIndex = 0;

      lanes.forEach((lane, index) => {
        if (uid === lane.uid) {
          return;
        }

        const startIsBetween = lane.quarterIndexStart <= quarterIndexStart && quarterIndexStart < lane.quarterIndexEnd;
        const endIsBetween = lane.quarterIndexStart < quarterIndexEnd && quarterIndexEnd <= lane.quarterIndexEnd;

        if (startIsBetween || endIsBetween) {
          lanesTotal += 1;
          laneIndex += 1;

          lanes[index].lanesTotal += 1;
        }
      });

      lanes.push({
        uid,
        quarterIndexStart,
        quarterIndexEnd,
        lanesTotal,
        laneIndex,
      });
    });

    lanes.forEach((lane) => {
      positions[lane.uid] = lane;
    });

    return {
      positions,
    };
  }

  /**
   * Component state.
   *
   * @type {Object}
   */
  state = {
    ready: false,
    width: null,
    height: null,
    positions: {},
  };

  /**
   * Timeout until updating state after resize.
   *
   * @type {number}
   */
  updateStateTimeout = undefined;

  /**
   * Mount handler.
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Unmount handler.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Update the cached width and height.
   */
  handleResize = () => {
    if (!this.container) {
      return;
    }

    clearTimeout(this.updateStateTimeout);

    this.updateStateTimeout = setTimeout(() => {
      this.setState({
        ready: true,
        width: this.container.clientWidth,
        height: this.container.clientHeight,
      });
    }, 150);
  };

  /**
   * Compute the style for the given event.
   *
   * @param event
   * @returns {*}
   */
  computedEventStyle(event) {
    if (!this.container) {
      return {};
    }

    const { start, end } = this.props;
    const quarterIndexScheduleStart = start * QUARTERS_PER_HOUR;
    const quarterIndexScheduleEnd = end * QUARTERS_PER_HOUR;
    const numberOfFrameItems = quarterIndexScheduleEnd - quarterIndexScheduleStart + QUARTERS_PER_HOUR;
    const {
      quarterIndexStart,
      quarterIndexEnd,
      lanesTotal,
      laneIndex,
    } = this.state.positions[event.get('uid')];
    const widthPerLaneItem = this.state.width / lanesTotal;
    const heightPerFrameItem = this.state.height / numberOfFrameItems;
    const duration = quarterIndexEnd - quarterIndexStart;
    const computedTranslateY = (
      (quarterIndexStart - quarterIndexScheduleStart)
      * heightPerFrameItem
      + EVENT_PADDING
      + 1
    );
    const computedTranslateX = widthPerLaneItem * laneIndex;
    const computedWidth = lanesTotal === 1
      ? undefined
      : widthPerLaneItem - (laneIndex === lanesTotal - 1 ? 0 : 2 * EVENT_PADDING);
    const computedHeight = duration * heightPerFrameItem - (2 * EVENT_PADDING) - 1;

    return {
      transform: `translateX(${computedTranslateX}px) translateY(${computedTranslateY}px)`,
      width: computedWidth,
      height: computedHeight,
    };
  }

  /**
   * Cache the container height.
   *
   * @param ref

   */
  decorateContainer = (ref) => {
    if (ref) {
      this.setState({
        ready: true,
        width: ref.clientWidth,
        height: ref.clientHeight,
      });
    }

    this.container = ref;
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div ref={this.decorateContainer} className={styles.root}>
        {this.maybeRenderEvents()}
      </div>
    );
  }

  /**
   * Render all events after the container was mounted.
   *
   * @returns {*}
   */
  maybeRenderEvents() {
    if (!this.state.ready) {
      return false;
    }

    return this.props.events.valueSeq().map(event => (
      <Event
        key={event.get('uid')}
        event={event}
        style={this.computedEventStyle(event)}
      />
    )).toArray();
  }
}
