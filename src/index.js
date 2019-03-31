import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import './styles/app.scss';
import './build/antd.css';
import './build/tailwind.css';
import configureStore from './store/configureStore';


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

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(console.clear); // eslint-disable-line no-console
}
