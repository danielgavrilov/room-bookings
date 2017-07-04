import R from 'ramda';
import moment from '../moment';

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
  } else if (pending) {
    return false;
  }
  const today = new Date();
  const received = cache[dateKey].received; // time received
  const minutes = getDateKey(today) === dateKey ?
                  CACHE_TODAY_MINUTES :
                  CACHE_DEFAULT_MINUTES;
  return (new Date() - received) / 1000 / 60 > minutes;
}

function requestBookingsForDay(date) {
  const start = moment(date).startOf("day").toDate();
  const end = moment(date).endOf("day").toDate();
  return getBookings({ start, end });
}

function structureBookings(bookings) {
  // TODO remove duplication of roomname, roomid?
  return R.groupBy(getUniqueRoomKey, bookings);
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
  //   const requested = new Date();
  //
  //   const promise = requestBookingsForDay(date)
  //     .then(structureBookings)
  //     .then((bookingsByRoom) => {
  //       // do not update cache if a newer request has updated it
  //       // this can happen when a request is invalidated while it's pending
  //       if (requested >= cache[dateKey].requested) {
  //         cache[dateKey] = {
  //           pending: false,
  //           invalidated: false,
  //           received: new Date(),
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
