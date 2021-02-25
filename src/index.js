import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import store from './store';
import { getDocument } from './core/functions/browser';
import { getRoutes } from './server/routes';

getRoutes(
  (routes) => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <App routes={routes} />
      </Provider>,
      getDocument().getElementById('root'),
    );
  },
  (err) => {
    ReactDOM.hydrate(
      <div style={{ 'padding': '25px', 'textAlign': 'center' }}>
        <h3>На сайте возникли технические неполадки, зайдите немного позже</h3>
        <h4>Код: <span style={{ 'color': 'red' }}>CRITICAL-INDEX-FETCH-ROUTES</span></h4>
      </div>,
      getDocument().getElementById('root'),
    );

    console.log('[TD][INDEX] CRITICAL-INDEX-FETCH-ROUTES', err);
  },
);

serviceWorker.unregister();
