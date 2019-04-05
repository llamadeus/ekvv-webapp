import {
  Button,
  message,
  notification,
} from 'antd';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import './bootstrap';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { webappType } from './utils/app';


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
serviceWorker.register({
  onSuccess() {
    message.success(`Diese ${webappType()} ist jetzt offlinefähig!`);
  },
  onUpdate() {
    notification.open({
      message: '♻️ Update verfügbar',
      description: `Aktiviere nice neue Features, indem du die ${webappType()} aktualisierst.`,
      btn: (
        <Button type="primary" size="small" onClick={() => window.location.reload(true)}>
          Aktualisieren
        </Button>
      ),
      duration: 0,
    });
  },
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(console.clear); // eslint-disable-line no-console
}
