import {
  Card,
  Layout,
} from 'antd';
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
import PropTypes from 'prop-types';


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
      <Layout className="flex flex-1 flex-col">
        <Layout.Header className="text-white">eKVV</Layout.Header>

        <Layout.Content className="flex flex-col pt-6 pb-4 px-4">
          <DaySelect
            selected={this.props.selectedDay}
            onChange={this.props.onChangeDay}
          />

          <Card
            className="flex flex-1 mt-4"
            bodyStyle={{
              display: 'flex',
              flex: 1,
              padding: 0,
            }}
          >
            <ScheduleComponent events={[]}/>
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}
