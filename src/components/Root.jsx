import App from 'app/components/App';
import { ConnectedRouter } from 'connected-react-router';
import { historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';


/**
 * Root component
 *
 * @param props
 * @returns {*}
 */
function Root(props) {
  const { store, history } = props;

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Provider>
  );
}

Root.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
  store: PropTypes.shape().isRequired,
};

export default hot(Root);
