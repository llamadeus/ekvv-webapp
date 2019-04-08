import { Layout } from 'antd';
import ImmutablePropTypes from 'immutable-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { getEvents } from '../selectors/schedule';
import { getInitialized } from '../selectors/ui';
import { mapStateToProps } from '../utils/redux';
import NotFound from '../views/NotFound';
import Schedule from '../views/Schedule';
import Start from '../views/Start';
import LoadingSpinner from './LoadingSpinner';
import Navigation from './Navigation';


/**
 * Class App
 */
@mapStateToProps(state => ({
  initialized: getInitialized(state),
  events: getEvents(state),
}))
export default class App extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    initialized: PropTypes.bool.isRequired,
    events: ImmutablePropTypes.map,
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
    return (
      <Layout className="tw-flex tw-flex-1 tw-flex-col">
        <Navigation/>

        <div className="tw-container tw-flex tw-flex-1 tw-mx-auto">
          <Layout.Content className="tw-flex tw-flex-col tw-max-w-sm tw-mx-auto tw-pt-6 tw-pb-4 xs:tw-px-4">
            {this.renderContent()}
          </Layout.Content>
        </div>
      </Layout>
    );
  }

  renderContent() {
    if (!this.props.initialized) {
      return (
        <LoadingSpinner/>
      );
    }

    if (this.props.events === null) {
      return (
        <Switch>
          <Route path="/" component={Start} exact/>
          <Route component={NotFound}/>
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/" component={Schedule} exact/>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
