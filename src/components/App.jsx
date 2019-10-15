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
import { isWebapp } from '../utils/app';
import { mapStateToProps } from '../utils/redux';
import NotFound from '../views/NotFound';
import Schedule from '../views/Schedule';
import Settings from '../views/Settings';
import Start from '../views/Start';
import LoadingSpinner from './LoadingSpinner';
import Navigation from './Navigation';
import { Helmet } from 'react-helmet';


/**
 * Number of taps until the page is force reloaded.
 *
 * @type {number}
 */
const TAPS_UNTIL_RELOAD = 10;

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
   * Counts the number of taps in a row.
   *
   * @type {number}
   */
  tapCounter = 0;

  /**
   * Timeout until the tap counter is reset.
   *
   * @type {number|null}
   */
  resetTapCounterTimeout = null;

  /**
   * Called when the app is mounted.
   */
  componentDidMount() {
    document.addEventListener('touchend', this.handleGlobalTouchEnd);
  }

  /**
   * Called when the app will be unmounted.
   */
  componentWillUnmount() {
    document.removeEventListener('touchend', this.handleGlobalTouchEnd);
  }

  /**
   * Force reload the page after `TAPS_UNTIL_RELOAD` taps.
   */
  handleGlobalTouchEnd = () => {
    clearTimeout(this.resetTapCounterTimeout);

    this.resetTapCounterTimeout = setTimeout(() => {
      this.tapCounter = 0;
    }, 250);

    this.tapCounter += 1;

    if (this.tapCounter >= TAPS_UNTIL_RELOAD) {
      window.location.reload(true);
    }
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <Layout className="tw-flex tw-flex-1 tw-flex-col">
        {this.maybeRenderWebappHelmet()}

        <Navigation/>

        <div className="tw-container tw-flex tw-flex-1 tw-mx-auto">
          <Layout.Content className="tw-flex tw-flex-col tw-max-w-sm tw-mx-auto tw-pt-6 tw-pb-4 tw-px-4 sm:tw-px-0">
            {this.renderContent()}
          </Layout.Content>
        </div>
      </Layout>
    );
  }

  /**
   * Update document head when in webapp.
   *
   * @returns {*}
   */
  maybeRenderWebappHelmet() {
    if (!isWebapp()) {
      return false;
    }

    return (
      <Helmet>
        <style type="text/css">{`
body {
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  overscroll-behavior-y: contain;
}
`}
        </style>
      </Helmet>
    );
  }

  /**
   * Render the content.
   *
   * @returns {*}
   */
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
        <Route path="/settings" component={Settings} exact/>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
