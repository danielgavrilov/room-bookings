import R from 'ramda';
import moment from '../moment';

import now from '../utils/now';
import { getBookings } from './endpoints';
import { getDateKey, getUniqueRoomKey } from '../utils/keys';

import todayBookings from '../data/bookings.json';

const CACHE_TODAY_MINUTES = 2;    // cache in minutes for today's bookings
const CACHE_DEFAULT_MINUTES = 10; // cache in minutes for any other bookings
// the reason for this: bookings made on the day can be automatic and can go
// through immediately

const cache = {};

function expired(dateKey) {
  if (cache[dateKey] == null ||
      cache[dateKey].invalidated ||
      !cache[dateKey].pending && !cache[dateKey].received) {
    return true;
  } else if (cache[dateKey].pending) {
    return false;
  }
  const today = now();
  const received = cache[dateKey].received; // time received
  const minutes = getDateKey(today) === dateKey ?
                  CACHE_TODAY_MINUTES :
                  CACHE_DEFAULT_MINUTES;
  return today.diff(received, "minutes") > minutes;
}

function requestBookingsForDay(date) {
  const start = date.clone().startOf("day");
  const end = date.clone().endOf("day");
  return getBookings({ start, end });
}

function types(booking) {
  booking.start_time = moment(booking.start_time).tz("Europe/London");
  booking.end_time = moment(booking.end_time).tz("Europe/London");
  return booking;
}

function structureBookings(bookings) {
  // TODO remove duplication of roomname, roomid?
  return R.compose(
    R.groupBy(getUniqueRoomKey),
    R.map(types)
  )(bookings);
}

export function getBookingsForDay(date) {

  // temporarily resolve from local bookings.json
  return new Promise((resolve) => resolve(todayBookings));

  // TODO uncomment

  // const dateKey = getDateKey(date);
  //
  // if (cache[dateKey] && !cache[dateKey].invalidated && !expired(dateKey)) {
  //   return cache[dateKey].pending ?
  //          cache[dateKey].promise :
  //          new Promise((resolve) => resolve(cache[dateKey].bookingsByRoom));
  // } else {
  //
  //   const requested = now();
  //
  //   const promise = requestBookingsForDay(date)
  //     .then(structureBookings)
  //     .then((bookingsByRoom) => {
  //       // do not update cache if a newer request has updated it
  //       // this can happen when a request is invalidated while it's pending
  //       if (requested.diff(cache[dateKey].requested) >= 0) {
  //         cache[dateKey] = {
  //           pending: false,
  //           invalidated: false,
  //           received: now(),
  //           bookingsByRoom,
  //           requested,
  //           promise
  //         }
  //       }
  //       return bookingsByRoom;
  //     })
  //     .catch((error) => {
  //       cache[dateKey].pending = false;
  //       cache[dateKey].invalidated = true;
  //       throw error;
  //     });
  //
  //   cache[dateKey] = {
  //     pending: true,
  //     invalidated: false,
  //     requested,
  //     promise
  //   };
  //
  //   return promise;
  // }
}
