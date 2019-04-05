import { Card } from 'antd';
import { debounce } from 'lodash-es';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { setSelectedDay } from '../../actions/schedule';
import { DAYS } from '../../constants/schedule';
import { Day } from '../../prop-types';
import { getSelectedDay } from '../../selectors/schedule';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../utils/redux';
import ScheduleComponent from '../Schedule';
import styles from './styles.module.scss';


/**
 * Class WeekScroller
 */
@mapStateToProps(state => ({
  selectedDay: getSelectedDay(state),
}))
@mapDispatchToProps(dispatch => bindActionCreators({
  onSetSelectedDay: setSelectedDay,
}, dispatch))
export default class WeekScroller extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    selectedDay: Day.isRequired,
    onSetSelectedDay: PropTypes.func.isRequired,
  };

  /**
   * Debounce the scroll handler.
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.handleScrollDebounced = debounce(this.handleScrollDebounced, 100);
  }

  /**
   * Scroll to the selected day.
   */
  componentDidMount() {
    this.scrollToDay(this.props.selectedDay);
  }

  /**
   * Scroll to the selected day.
   */
  componentDidUpdate() {
    this.scrollToDay(this.props.selectedDay, true);
  }

  /**
   * Scroll to the given day.
   *
   * @param day
   * @param smooth
   */
  scrollToDay(day, smooth = false) {
    const dayIndex = Object.keys(DAYS).findIndex(dayKey => dayKey === day);

    if (dayIndex >= 0) {
      const { scrollWidth, clientWidth } = this.root;
      const scrollPerDay = (scrollWidth - clientWidth) / (Object.keys(DAYS).length - 1);
      const { scrollBehavior } = window.getComputedStyle(this.root);

      if (smooth) {
        this.root.style.scrollBehavior = 'smooth';
      }

      this.root.scrollLeft = scrollPerDay * dayIndex;

      if (smooth) {
        this.root.style.scrollBehavior = scrollBehavior;
      }
    }
  }

  /**
   * Handle container scrolling.
   *
   * @param event
   */
  handleScroll = (event) => {
    event.persist();

    this.handleScrollDebounced(event);
  };

  /**
   * Update the selected date when scrolling is done.
   *
   * @param event
   */
  handleScrollDebounced = ({ target }) => {
    const dayKeys = Object.keys(DAYS);
    const scrollPerDay = (target.scrollWidth - target.clientWidth) / (dayKeys.length - 1);
    const dayIndex = Math.round(target.scrollLeft / scrollPerDay);
    const day = dayKeys[dayIndex];

    if (typeof day != 'undefined') {
      this.props.onSetSelectedDay(day);
    }
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div ref={ref => (this.root = ref)} className={styles.root} onScroll={this.handleScroll}>
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

    return Object.keys(DAYS).map(day => (
      <Card
        key={day}
        className={styles.item}
        bodyStyle={cardBodyStyle}
      >
        <ScheduleComponent day={day}/>
      </Card>
    ));
  }
}
