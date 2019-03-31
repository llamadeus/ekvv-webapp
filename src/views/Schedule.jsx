import { Card } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { setSelectedDay } from '../actions/schedule';
import DaySelect from '../components/DaySelect';
import ScheduleComponent from '../components/Schedule';
import { Day } from '../prop-types';
import { getSelectedDay } from '../selectors/schedule';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../utils/redux';


/**
 * Class Schedule
 */
@mapStateToProps(state => ({
  selectedDay: getSelectedDay(state),
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

        <Card
          className="tw-flex tw-flex-1 tw-mt-4"
          bodyStyle={{
            display: 'flex',
            flex: 1,
            padding: 0,
          }}
        >
          <ScheduleComponent events={[]}/>
        </Card>
      </React.Fragment>
    );
  }
}
