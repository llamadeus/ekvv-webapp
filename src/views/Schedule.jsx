import React from 'react';
import WeekScroller from '../components/WeekScroller';
import { Moment } from '../prop-types';
import { getSelectedWeek } from '../selectors/schedule';
import { mapStateToProps } from '../utils/redux';


/**
 * Class Schedule
 */
@mapStateToProps(state => ({
  selectedWeek: getSelectedWeek(state),
}))
export default class Schedule extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    selectedWeek: Moment.isRequired,
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
      />
    );
  }
}
