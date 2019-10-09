import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from '../reducers';
import rootSaga from '../sagas';


/**
 * Create the redux store.
 *
 * @param history
 * @returns {*}
 */
export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
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

  let sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createRootReducer(history));

      console.clear(); // eslint-disable-line no-console
      console.log('[HMR] Reloaded reducer'); // eslint-disable-line no-console
    });

    module.hot.accept('../sagas', () => {
      if (sagaTask !== null) {
        sagaTask.cancel();
      }

      sagaTask = sagaMiddleware.run(rootSaga);

      console.clear(); // eslint-disable-line no-console
      console.log('[HMR] Reloaded saga'); // eslint-disable-line no-console
    });
  }

  return store;
}
