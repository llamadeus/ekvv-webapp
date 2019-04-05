import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import WeekScroller from '../components/WeekScroller';
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
    selectedWeek: PropTypes.instanceOf(moment).isRequired,
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
