import {
  ERROR,
  META,
  PAYLOAD,
} from 'app/constants/redux';
import createRootReducer from 'app/reducers';
import { routerMiddleware } from 'connected-react-router';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';


/**
 * Keys which can change the treatment of an action creator result.
 *
 * @type {symbol[]}
 */
const PAYLOAD_KEYS = [PAYLOAD, META, ERROR];

/**
 * Determine if none of the treatment changing payload keys are present.
 *
 * @param payload
 * @returns {boolean}
 */
function hasDirectPayload(payload) {
  return PAYLOAD_KEYS.every(key => typeof payload[key] == 'undefined');
}

/**
 * Handle dispatched functions.
 *
 * @returns {function(*): function(...[*]=)}
 */
function dispatchMiddleware() {
  return next => (action, args = []) => {
    if (typeof action != 'function') {
      return next(action);
    }

    const descriptor = Object.getOwnPropertyDescriptor(action, 'toString');

    if (typeof descriptor == 'undefined') {
      Object.defineProperty(action, 'toString', {
        value: () => action.name,
      });
    }

    const payload = action(...args);
    const reduxAction = {
      type: action,
    };

    if (hasDirectPayload(payload)) {
      reduxAction.payload = payload;
    }
    else {
      if (typeof payload[PAYLOAD] != 'undefined') {
        reduxAction.payload = payload[PAYLOAD];
      }

      if (typeof payload[META] != 'undefined') {
        reduxAction.meta = payload[META];
      }

      if (typeof payload[ERROR] != 'undefined') {
        reduxAction.error = payload[ERROR];
      }
    }

    return next(reduxAction);
  };
}

/**
 * Create the redux store.
 *
 * @param history
 * @returns {*}
 */
export default function configureStore(history) {
  const middleware = [
    dispatchMiddleware,
    routerMiddleware(history),
  ];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    /** @namespace window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */
    // eslint-disable-next-line no-underscore-dangle
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      // eslint-disable-next-line no-underscore-dangle
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: {
          options: {
            function: type => type.name,
          },
        },
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

      // eslint-disable-next-line no-console
      console.clear();
      // eslint-disable-next-line no-console
      console.log('[HMR] Reloaded reducer');
    });
  }

  return store;
}
