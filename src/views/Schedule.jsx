import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { setSelectedDay } from '../actions/schedule';
import WeekScroller from '../components/WeekScroller';
import { Moment } from '../prop-types';
import {
  getSelectedDay,
  getSelectedWeek,
} from '../selectors/schedule';
import { DayShape } from '../shapes/schedule';
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
}))
@mapDispatchToProps(dispatch => bindActionCreators({
  onSetSelectedDay: setSelectedDay,
}, dispatch))
export default class Schedule extends React.PureComponent {
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
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <WeekScroller
        selectedWeek={this.props.selectedWeek}
        selectedDay={this.props.selectedDay}
        onSetSelectedDay={this.props.onSetSelectedDay}
      />
    );
  }
}
