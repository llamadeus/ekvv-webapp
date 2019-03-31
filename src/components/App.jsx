import { Layout } from 'antd';
import ImmutablePropTypes from 'immutable-prop-types';
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { getEvents } from '../selectors/schedule';
import { mapStateToProps } from '../utils/redux';
import Schedule from '../views/Schedule';
import Start from '../views/Start';
import Navigation from './Navigation';


/**
 * Class App
 */
@mapStateToProps(state => ({
  events: getEvents(state),
}))
export default class App extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    events: ImmutablePropTypes.list,
  };

  /**
   * Default props.
   *
   * @type {Object}
   */
  static defaultProps = {
    events: null,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const indexComponent = this.props.events === null
      ? Start
      : Schedule;

    return (
      <Layout className="tw-flex tw-flex-1 tw-flex-col">
        <Navigation/>

        <Layout.Content className="tw-flex tw-flex-col tw-pt-6 tw-pb-4 tw-px-4">
          <Switch>
            <Route path="/" component={indexComponent} exact/>
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}
