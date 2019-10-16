import { setSelectedDay } from 'app/actions/schedule';
import WeekScroller from 'app/components/WeekScroller';
import { Moment } from 'app/prop-types';
import {
  getSelectedDay,
  getSelectedWeek,
} from 'app/selectors/schedule';
import { DayShape } from 'app/shapes/schedule';
import {
  mapDispatchToProps,
  mapStateToProps,
} from 'app/utils/redux';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';


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
