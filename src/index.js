import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moment from './moment';
import FastClick from 'fastclick';

import App from './components/App';
import rootReducer from './reducers';
import { fetchBookings } from './actions';

import 'normalize.css'
import './index.css';

const today = moment().startOf("day"); // today at 00:00

const initialState = {
  active: false,
  loading: true,
  error: null,
  date: today,
  diaryDate: today, // holds the date of the current roomDiaries
  hours: 0,
  between: [
    "08:00",
    "14:00"
  ],
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

FastClick.attach(document.body);

store.dispatch(fetchBookings(today));
