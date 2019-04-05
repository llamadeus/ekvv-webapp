import { Card } from 'antd';
import ImmutablePropTypes from 'immutable-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { setSelectedDay } from '../actions/schedule';
import DaySelect from '../components/DaySelect';
import ScheduleComponent from '../components/Schedule';
import WeekScroller from '../components/WeekScroller';
import { Day } from '../prop-types';
import {
  getEventsForDay,
  getSelectedDay,
  getSelectedWeek,
} from '../selectors/schedule';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../utils/redux';


/**
 * Class Schedule
 */
@mapStateToProps(state => ({
  selectedWeek: getSelectedWeek(state),
  selectedDay: getSelectedDay(state),
  events: getEventsForDay(state),
}))
@mapDispatchToProps(dispatch => bindActionCreators({
  onChangeDay: setSelectedDay,
}, dispatch))
export default class Schedule extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    selectedDay: Day.isRequired,
    events: ImmutablePropTypes.map.isRequired,
    onChangeDay: PropTypes.func.isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <React.Fragment>
        <DaySelect
          selected={this.props.selectedDay}
          onChange={this.props.onChangeDay}
        />

        <WeekScroller events={this.props.events}/>
      </React.Fragment>
    );
  }
}
