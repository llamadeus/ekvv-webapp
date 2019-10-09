import { Card } from 'antd';
import moment from 'moment';
import React from 'react';
import {
  DAY_OFFSETS,
  DAYS,
} from '../../constants/schedule';
import { Moment } from '../../prop-types';
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
    selectedWeek: Moment.isRequired,
  };

  /**
   * Scroll to the selected day.
   */
  componentDidMount() {
    const dayIndex = moment().day();
    const day = Object.getOwnPropertySymbols(DAY_OFFSETS).find(key => DAY_OFFSETS[key] === dayIndex - 1);

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
    const dayIndex = Object.keys(DAYS).findIndex(key => DAYS[key] === day);

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
