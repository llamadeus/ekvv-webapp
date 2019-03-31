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
      <Layout className="flex flex-1 flex-col">
        <Navigation/>

        <Layout.Content className="flex flex-col pt-6 pb-4 px-4">
          <Switch>
            <Route path="/" component={Schedule} exact/>
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}
