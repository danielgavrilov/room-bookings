import moment from '../moment';


import { getBookings } from './api';
import { getDateKey } from '../utils/keys';
import diaries from './diaries';

import {
  MAX_RETRIES,
  CACHE_DEFAULT_MINUTES,
  CACHE_TODAY_MINUTES,
  NO_DATA_ERROR_MESSAGE
} from '../config';

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

function requestBookingsForDay(date, retries=0) {
  const start = date.clone().startOf("day");
  const end = date.clone().endOf("day");
  return getBookings({ start, end })
    .catch((error) => {
      if (retries < MAX_RETRIES) {
        return requestBookingsForDay(date, retries + 1);
      } else {
        throw error;
      }
    });
}

export function getBookingsForDay(date) {

  const dateKey = getDateKey(date);

  if (cache[dateKey] && !cache[dateKey].invalidated && !expired(dateKey)) {
    return cache[dateKey].pending ?
           cache[dateKey].promise :
           new Promise((resolve) => resolve(cache[dateKey].roomDiaries));
  } else {

    const requested = moment();

    const promise = requestBookingsForDay(date)
      // prevent `diaries` from autopopulating missing rooms if there are no
      // bookings for *any* room
      .then((bookings) => {
        if (bookings.length > 0) {
          return diaries(date, bookings);
        } else {
          throw new Error(NO_DATA_ERROR_MESSAGE);
        }
      })
      .then((roomDiaries) => {
        // do not update cache if a newer request has updated it
        // this can happen when a request is invalidated while it's pending
        if (requested.diff(cache[dateKey].requested) >= 0) {
          cache[dateKey] = {
            pending: false,
            invalidated: false,
            received: moment(),
            roomDiaries,
            requested,
            promise
          }
        }
        return roomDiaries;
      })
      .catch((error) => {
        cache[dateKey].pending = false;
        cache[dateKey].invalidated = true;
        throw error;
      });

    cache[dateKey] = {
      pending: true,
      invalidated: false,
      requested,
      promise
    };

    return promise;
  }
}
