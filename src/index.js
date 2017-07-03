import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

import './index.css';

const state = {};
const store = createStore(rootReducer, state);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
