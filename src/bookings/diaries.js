import R from 'ramda';
import moment from '../moment';

import rooms from '../data/rooms.json';
import { getUniqueRoomKey } from '../utils/keys';
import { relativeTime } from '../utils/dates';

import {
  DEFAULT_ROOM_OPENING,
  DEFAULT_ROOM_CLOSING,
  LATEST_OPENING,
  EARLIEST_CLOSING
} from '../config.js';

const reClosed = /(UCL|Room|Rm\.)\sClosed/i;

function closure(booking) {
  const { contact, description } = booking;
  return reClosed.test(contact) || reClosed.test(description);
}

function openingTime(date, bookings) {
  const t = relativeTime(date);
  let opens = t(DEFAULT_ROOM_OPENING);
  bookings = R.sortBy(R.prop("start_time"), bookings);
  for (const booking of bookings) {
    if (closure(booking) && (booking.start_time.isSameOrBefore(t(LATEST_OPENING)) ||
                             booking.start_time.isSameOrBefore(opens))) {
      opens = booking.end_time;
    } else {
      if (!closure(booking) && booking.start_time.isBefore(opens)) {
        opens = booking.start_time.clone();
      }
      break;
    }
  }
  return opens;
}

function closingTime(date, bookings) {
  const t = relativeTime(date);
  let closes = t(DEFAULT_ROOM_CLOSING);
  bookings = R.sortBy(R.prop("end_time"), bookings).reverse();
  for (const booking of bookings) {
    if (closure(booking) && (booking.end_time.isSameOrAfter(t(EARLIEST_CLOSING)) ||
                             booking.end_time.isSameOrAfter(closes))) {
      closes = booking.start_time;
    } else {
      if (!closure(booking) && booking.end_time.isAfter(closes)) {
        closes = booking.end_time.clone();
      }
      break;
    }
  }
  return closes;
}

function availability({ closedAllDay, opens, closes, bookings }) {

  if (closedAllDay) return [];

  let cursor = opens,
      intervals = [];

  bookings = R.sortBy(R.prop("start_time"), bookings);

  for (const { start_time, end_time } of bookings) {
    if (cursor.isBefore(start_time)) {
      intervals.push({
        start_time: cursor,
        end_time: start_time
      });
    }
    cursor = end_time;
  }

  if (cursor.isBefore(closes)) {
    intervals.push({
      start_time: cursor,
      end_time: closes
    });
  }

  return intervals;
}

function openingAndClosing(date, bookings) {

  date = moment(date).clone().startOf("day"); // make sure we're at 00:00 London time

  let available;
  let opens = openingTime(date, bookings);
  let closes = closingTime(date, bookings);

  const closedAllDay = opens.isSameOrAfter(closes);

  if (closedAllDay) {
    bookings = [];
    available = [];
    opens = null;
    closes = null;
  } else {
    bookings = bookings.filter((booking) => {
      return booking.start_time.isSameOrAfter(opens) && booking.end_time.isSameOrBefore(closes);
    });
    available = availability({ closedAllDay, opens, closes, bookings });
  }

  return {
    closedAllDay,
    opens,
    closes,
    bookings,
    available
  }
}

function addMissingRooms(bookingsByRoom) {
  for (const room of rooms) {
    const key = getUniqueRoomKey(room);
    if (!(key in bookingsByRoom)) {
      bookingsByRoom[key] = [];
    }
  }
  return bookingsByRoom;
}

function types(booking) {
  booking.start_time = moment(booking.start_time);
  booking.end_time = moment(booking.end_time);
  return booking;
}

export default function diaries(date, bookings) {
  // TODO remove duplication of roomname, roomid?
  return R.compose(
    R.mapObjIndexed((bookings) => openingAndClosing(date, bookings)),
    addMissingRooms,
    R.groupBy(getUniqueRoomKey),
    R.map(types)
  )(bookings);
}
