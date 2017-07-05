import {
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  SEARCH_DATE,
  SEARCH_HOURS,
  SEARCH_BETWEEN,
  SEARCH_CAPACITY,
} from '../actions';

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
        console.log(action.roomDiaries);
        return {
          ...state,
          loading: false,
          roomDiaries: action.roomDiaries
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
        hours: action.hours
      }

    case SEARCH_BETWEEN:
      return {
        ...state,
        between: action.between
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
