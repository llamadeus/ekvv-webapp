import { Layout } from 'antd';
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Schedule from '../views/Schedule';
import Navigation from './Navigation';


/**
 * Class App
 */
export default class App extends React.PureComponent {
  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <Layout className="tw-flex tw-flex-1 tw-flex-col">
        <Navigation/>

        <Layout.Content className="tw-flex tw-flex-col tw-pt-6 tw-pb-4 tw-px-4">
          <Switch>
            <Route path="/" component={Schedule} exact/>
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}
