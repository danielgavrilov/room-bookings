import { getBookingsForDay } from '../bookings';
import { makeAction } from './utils';

export const FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";

export const fetchBookingsRequest = makeAction(
  FETCH_BOOKINGS_REQUEST,
  "date"
);

export const fetchBookingsSuccess = makeAction(
  FETCH_BOOKINGS_SUCCESS,
  "date",
  "roomDiaries"
);

export const fetchBookingsFailure = makeAction(
  FETCH_BOOKINGS_FAILURE,
  "date",
  "error"
);

export function fetchBookings(date) {
  return function(dispatch) {
    dispatch(fetchBookingsRequest(date));
    return getBookingsForDay(date)
      .then((roomDiaries) => dispatch(fetchBookingsSuccess(date, roomDiaries)))
      .catch((error) => dispatch(fetchBookingsFailure(date, error)));
  }
}
