import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { setSelectedDayAndScroll } from '../effects/schedule';
import DaySelect from '../components/DaySelect';
import WeekScroller from '../components/WeekScroller';
import { Day } from '../prop-types';
import {
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
}))
@mapDispatchToProps(dispatch => bindActionCreators({
  onSetSelectedDayAndScroll: setSelectedDayAndScroll,
}, dispatch))
export default class Schedule extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    selectedDay: Day.isRequired,
    onSetSelectedDayAndScroll: PropTypes.func.isRequired,
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
          onChange={this.props.onSetSelectedDayAndScroll}
        />

        <WeekScroller/>
      </React.Fragment>
    );
  }
}
