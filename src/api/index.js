import R from 'ramda';
import moment from 'moment';

import { getBookings } from './endpoints';
import { getDateKey, getUniqueRoomKey } from '../utils/keys';

import todayBookings from '../data/bookings.json';

const CACHE_TODAY_MINUTES = 2;
const CACHE_DEFAULT_MINUTES = 10;

const cache = {};

function expired(dateKey) {
  if (cache[dateKey] == null) return true;
  const minutes = getDateKey(new Date()) === dateKey ?
                  CACHE_TODAY_MINUTES :
                  CACHE_DEFAULT_MINUTES;
  return (new Date() - cache[dateKey].requested) / 1000 / 60 > minutes;
}

function requestBookingsForDay(date) {
  const start = moment(date).startOf("day").toDate();
  const end = moment(date).endOf("day").toDate();
  return getBookings({ start, end });
}

function structureBookings(bookings) {
  // TODO remove duplication of roomname roomid?
  return R.groupBy(getUniqueRoomKey, bookings);
}

function cacheBookings(dateKey, bookingsByRoom) {
  const cacheItem = cache[dateKey];
  cacheItem.pending = false;
  cacheItem.bookingsByRoom = bookingsByRoom;
  return bookingsByRoom;
}

export function getBookingsForDay(date) {

  return new Promise((resolve) => resolve(todayBookings));

  // TODO uncomment

  // const dateKey = getDateKey(date);
  //
  // if (cache[dateKey] && cache[dateKey].pending) {
  //   return cache[dateKey].promise;
  // } else if (cache[dateKey] && !cache[dateKey].pending && !expired(dateKey)) {
  //   return new Promise((resolve) => resolve(cache[dateKey].bookingsByRoom));
  // } else {
  //
  //   const promise = requestBookingsForDay(date)
  //     .then(structureBookings)
  //     .then((bookingsByRoom) => {
  //        return cacheBookings(dateKey, bookingsByRoom);
  //      });
  //
  //   cache[dateKey] = {
  //     date: dateKey,
  //     pending: true,
  //     requested: new Date(),
  //     promise
  //   };
  //
  //   return promise;
  // }
}
