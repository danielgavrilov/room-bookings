import moment from '../moment';

import { getBookings } from './endpoints';
import { getDateKey } from '../utils/keys';
import structureBookings from './structure-bookings';

import todayBookings from '../data/bookings.json';

const MAX_RETRIES = 2;

const CACHE_TODAY_MINUTES = 2;    // cache in minutes for today's bookings
const CACHE_DEFAULT_MINUTES = 10; // cache in minutes for any other bookings
// the reason for this: bookings made on the day can be automatic and can go
// through immediately

const cache = {};

function expired(dateKey) {
  if (cache[dateKey] == null ||
      cache[dateKey].invalidated ||
      (!cache[dateKey].pending && !cache[dateKey].received)) {
    return true;
  } else if (cache[dateKey].pending) {
    return false;
  }
  const today = moment();
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

export function getBookingsForDay(date, retries=0) {

  // temporarily resolve from local bookings.json
  return new Promise((resolve) => {
    setTimeout(() => resolve(structureBookings(date, todayBookings)), 1000);
  });

  // TODO uncomment

  // const dateKey = getDateKey(date);
  //
  // if (cache[dateKey] && !cache[dateKey].invalidated && !expired(dateKey)) {
  //   return cache[dateKey].pending ?
  //          cache[dateKey].promise :
  //          new Promise((resolve) => resolve(cache[dateKey].roomDiaries));
  // } else {
  //
  //   const requested = moment();
  //
  //   const promise = requestBookingsForDay(date)
  //     .then((bookings) => structureBookings(date, bookings))
  //     .then((roomDiaries) => {
  //       // do not update cache if a newer request has updated it
  //       // this can happen when a request is invalidated while it's pending
  //       if (requested.diff(cache[dateKey].requested) >= 0) {
  //         cache[dateKey] = {
  //           pending: false,
  //           invalidated: false,
  //           received: moment(),
  //           roomDiaries,
  //           requested,
  //           promise
  //         }
  //       }
  //       return roomDiaries;
  //     })
  //     .catch((error) => {
  //       cache[dateKey].pending = false;
  //       cache[dateKey].invalidated = true;
  //       if (retries < MAX_RETRIES) {
  //         return getBookingsForDay(date, retries + 1);
  //       } else {
  //         throw error;
  //       }
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
