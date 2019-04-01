import moment from 'moment';
import ImmutablePropTypes from 'immutable-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import Event from '../Event';
import styles from './styles.module.scss';


/**
 * Padding around each event.
 *
 * @type {number}
 */
const EVENT_PADDING = 1;

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
   * Component state.
   *
   * @type {Object}
   */
  state = {
    height: null,
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
    const numberOfFrameItems = end - start + 1;
    const heightPerFrameItem = this.state.height / numberOfFrameItems;
    const eventStart = moment(event.get('start'));
    const eventEnd = moment(event.get('end'));
    const startHour = Number(eventStart.format('H'));
    const endHour = Number(eventEnd.format('H'));
    const duration = endHour - startHour;
    const computedTranslateY = Math.round((startHour - start) * heightPerFrameItem + EVENT_PADDING);
    const computedHeight = Math.round(duration * heightPerFrameItem - (2 * EVENT_PADDING));

    return {
      transform: `translateY(${computedTranslateY}px)`,
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
      this.setState({ height: ref.clientHeight });
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
    if (this.state.height === null) {
      return false;
    }

    return this.props.events.valueSeq().map(event => (
      <Event
        key={event.get('uid')}
        event={event}
        style={this.computedEventStyle(event)}
      />
    ));
  }
}
