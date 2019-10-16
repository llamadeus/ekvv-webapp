import {
  resetRequestedDay,
  setSelectedDay,
} from 'app/actions/schedule';
import WeekScroller from 'app/components/WeekScroller';
import { Moment } from 'app/prop-types';
import {
  getRequestedDay,
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
  requestedDay: getRequestedDay(state),
}))
@mapDispatchToProps(dispatch => bindActionCreators({
  onSetSelectedDay: setSelectedDay,
  onResetRequestedDay: resetRequestedDay,
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
    requestedDay: DayShape,
    onSetSelectedDay: PropTypes.func.isRequired,
    onResetRequestedDay: PropTypes.func.isRequired,
  };

  /**
   * Default props.
   *
   * @type {Object}
   */
  static defaultProps = {
    requestedDay: null,
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
        requestedDay={this.props.requestedDay}
        onSetSelectedDay={this.props.onSetSelectedDay}
        onResetRequestedDay={this.props.onResetRequestedDay}
      />
    );
  }
}
