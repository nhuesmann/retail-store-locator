/* eslint no-underscore-dangle: "off" */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducers';
import rootSaga from './store/sagas';

const logger = store => next => action => {
  // eslint-disable-next-line no-console
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  // eslint-disable-next-line no-console
  console.log('[Middleware] Next state', store.getState());
  return result;
};

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
