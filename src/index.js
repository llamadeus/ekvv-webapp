import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import './bootstrap';
import Root from './components/Root';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';


const history = createBrowserHistory();
const store = configureStore(history);

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Root
    history={history}
    store={store}
  />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(console.clear); // eslint-disable-line no-console
}
