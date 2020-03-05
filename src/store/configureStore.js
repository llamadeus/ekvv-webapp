import createRootReducer from 'app/reducers';
import { routerMiddleware } from 'connected-react-router';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';


/**
 * Create the redux store.
 *
 * @param history
 * @returns {*}
 */
export default function configureStore(history) {
  const middleware = [
    routerMiddleware(history),
  ];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    /** @namespace window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */
    // eslint-disable-next-line no-underscore-dangle
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      // eslint-disable-next-line no-underscore-dangle
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: true,
      });
    }

    middleware.push(createLogger({
      level: 'info',
      collapsed: true,
    }));
  }

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middleware)),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createRootReducer(history));

      console.clear(); // eslint-disable-line no-console
      console.log('[HMR] Reloaded reducer'); // eslint-disable-line no-console
    });
  }

  return store;
}
