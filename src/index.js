import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moment from './moment';

import App from './components/App';
import rootReducer from './reducers';

import './index.css';

const today = moment().startOf("day");

const initialState = {
  active: false,
  loading: false,
  error: null,
  date: today, // today at 00:00
  hours: 1.0,
  between: [],
  capacity: [],
  roomDiaries: {}
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
