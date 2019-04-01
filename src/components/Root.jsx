import { ConnectedRouter } from 'connected-react-router';
import { historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import App from './App';


/**
 * Class Root
 */
@hot
export default class Root extends React.Component {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    history: PropTypes.shape(historyPropTypes).isRequired,
    store: PropTypes.shape().isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <App/>
        </ConnectedRouter>
      </Provider>
    );
  }
}
