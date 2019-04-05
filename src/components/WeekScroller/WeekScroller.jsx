import { Card } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {
  DAYS,
  DAYS_OFFSETS,
} from '../../constants/schedule';
import ScheduleComponent from '../Schedule';
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
    selectedWeek: PropTypes.instanceOf(moment).isRequired,
  };

  /**
   * Scroll to the selected day.
   */
  componentDidMount() {
    const dayIndex = moment().day();
    const day = Object.keys(DAYS_OFFSETS).find(key => dayIndex - 1 === DAYS_OFFSETS[key]);

    this.scrollToDay(
      typeof day == 'undefined'
        ? DAYS.MONDAY
        : day,
    );
  }

  /**
   * Scroll to the given day.
   *
   * @param day
   */
  scrollToDay(day) {
    const dayIndex = Object.keys(DAYS).findIndex(dayKey => dayKey === day);

    if (dayIndex >= 0) {
      const { scrollWidth, clientWidth } = this.root;
      const scrollPerDay = (scrollWidth - clientWidth) / (Object.keys(DAYS).length - 1);

      this.root.scrollLeft = scrollPerDay * dayIndex;
    }
  }

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div ref={ref => (this.root = ref)} className={styles.root}>
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
      <div key={day} className={styles.item}>
        <h1>
          {moment(this.props.selectedWeek).add(DAYS_OFFSETS[day], 'days').format('dddd, DD. MMMM')}
        </h1>
        <Card
          className="tw-flex tw-flex-1"
          bodyStyle={cardBodyStyle}
        >
          <ScheduleComponent day={day}/>
        </Card>
      </div>
    ));
  }
}
