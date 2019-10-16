import { Card } from 'antd';
import ScheduleComponent from 'app/components/Schedule';
import {
  DAY_OFFSETS,
  DAYS,
} from 'app/constants/schedule';
import { Moment } from 'app/prop-types';
import { DayShape } from 'app/shapes/schedule';
import {
  animate,
  Easing,
} from 'app/utils/animation';
import {
  getDayByIndex,
  getIndexByDay,
} from 'app/utils/schedule';
import { debounce } from 'lodash-es';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Class WeekScroller
 */
export default class WeekScroller extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    selectedWeek: Moment.isRequired,
    selectedDay: DayShape.isRequired,
    onSetSelectedDay: PropTypes.func.isRequired,
  };

  /**
   * Scroll per day.
   *
   * @type {number}
   */
  scrollPerDay = 0;

  /**
   * Disable scroll events.
   *
   * @type {boolean}
   */
  ignoreScrollEvents = false;

  /**
   * Prevent updating the selected day on next (debounced) scroll.
   *
   * @type {boolean}
   */
  preventDispatchOnNextScroll = false;

  /**
   * Prevent animation on next update.
   *
   * @type {boolean}
   */
  preventAnimationOnNextUpdate = false;

  /**
   * Debounce scroll handler.
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.handleScrollDebounced = debounce(this.handleScrollDebounced, 250);
  }

  /**
   * Scroll to the selected day.
   */
  componentDidMount() {
    const { scrollWidth, clientWidth } = this.root;

    this.scrollPerDay = (scrollWidth - clientWidth) / (Object.keys(DAYS).length - 1);

    this.scrollToDay(this.props.selectedDay);
  }

  /**
   * Scroll to the selected day.
   */
  componentDidUpdate() {
    if (!this.preventAnimationOnNextUpdate) {
      this.scrollToDay(this.props.selectedDay, true);
    }

    this.preventAnimationOnNextUpdate = false;
  }

  /**
   * Update scroll position with temporarily disabled scroll events.
   *
   * @param scrollLeft
   */
  setRootScrollLeft(scrollLeft) {
    this.ignoreScrollEvents = true;
    this.root.scroll(scrollLeft, 0);
    this.ignoreScrollEvents = false;
  }

  /**
   * Handle root container scroll.
   *
   * @param event
   */
  handleScroll = (event) => {
    if (event.target !== this.root) {
      return;
    }

    this.handleScrollDebounced(event.target.scrollLeft);
  };

  /**
   * Propagate the updated selected day to the parent component.
   *
   * @param scrollLeft
   */
  handleScrollDebounced = (scrollLeft) => {
    const dayIndex = Math.round(scrollLeft / this.scrollPerDay);
    const day = getDayByIndex(dayIndex);

    if (typeof day != 'undefined' && !this.preventDispatchOnNextScroll) {
      this.props.onSetSelectedDay(day);
    }

    this.preventDispatchOnNextScroll = false;
  };

  /**
   * Scroll to the given day.
   *
   * @param day
   * @param animated
   */
  scrollToDay(day, animated = false) {
    const dayIndex = getIndexByDay(day);

    if (dayIndex >= 0) {
      const targetScroll = this.scrollPerDay * dayIndex;

      this.preventDispatchOnNextScroll = true;

      if (animated) {
        const currentScroll = this.root.scrollLeft;
        const scrollRange = targetScroll - currentScroll;

        animate({
          start: () => {
            this.root.style.scrollSnapType = 'none';
          },
          progress: (percentage) => {
            this.setRootScrollLeft(currentScroll + scrollRange * Easing.easeInOutQuad(percentage));
          },
          done: () => {
            this.root.style.removeProperty('scroll-snap-type');

            this.setRootScrollLeft(targetScroll);
          },
        }, 350);
      }
      else {
        this.setRootScrollLeft(targetScroll);
      }
    }
  }

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div
        ref={ref => (this.root = ref)}
        onScroll={this.handleScroll}
        className={styles.root}
      >
        {this.renderDays()}
        <div className={styles.placeholder}/>
      </div>
    );
  }

  /**
   * Render a timetable for each day.
   *
   * @returns {*[]}
   */
  renderDays() {
    const cardBodyStyle = {
      display: 'flex',
      flex: 1,
      padding: 0,
    };

    return Object.keys(DAYS).map(key => (
      <div key={key} className={styles.item}>
        <h1>
          {moment(this.props.selectedWeek).add(DAY_OFFSETS[DAYS[key]], 'days').format('dddd, DD. MMMM')}
        </h1>
        <Card
          className="tw-flex tw-flex-1"
          bodyStyle={cardBodyStyle}
        >
          <ScheduleComponent day={DAYS[key]}/>
        </Card>
      </div>
    ));
  }
}
