import { ConnectedRouter } from 'connected-react-router';
import { historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';


/**
 * Class Root
 */
export default class Root extends React.PureComponent {
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
          <Switch />
        </ConnectedRouter>
      </Provider>
    );
  }
}