import { equals } from 'ramda';

import {
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  SEARCH_DATE,
  SEARCH_HOURS,
  SEARCH_START,
  SEARCH_END,
  SEARCH_CAPACITY,
} from '../actions';

const NO_DATA_ERROR = new Error("There is no data for the selected date.");

export default function(state, action) {
  switch (action.type) {

    case FETCH_BOOKINGS_REQUEST:
      if (action.date.isSame(state.date, "day")) {
        return {
          ...state,
          loading: true,
          error: null
        }
      }
      return state;

    case FETCH_BOOKINGS_SUCCESS:
      if (action.date.isSame(state.date, "day")) {
        return {
          ...state,
          loading: false,
          diaryDate: action.date,
          roomDiaries: action.roomDiaries,
          // in case there are no bookings from API, show error
          error: state.error ||
                 equals(action.roomDiaries, {}) ? NO_DATA_ERROR : null
        }
      }
      return state;

    case FETCH_BOOKINGS_FAILURE:
      if (action.date.isSame(state.date, "day")) {
        return {
          ...state,
          loading: false,
          error: action.error
        }
      }
      return state;

    case SEARCH_DATE:
      return {
        ...state,
        date: action.date
      }

    case SEARCH_HOURS:
      return {
        ...state,
        active: action.hours != 0,
        hours: action.hours
      }

    case SEARCH_START:
      return {
        ...state,
        between: [action.start, state.between[1]]
      }

    case SEARCH_END:
      return {
        ...state,
        between: [state.between[0], action.end]
      }

    case SEARCH_CAPACITY:
      return {
        ...state,
        capacity: action.capacity
      }

    default:
      return state;
  }
}
