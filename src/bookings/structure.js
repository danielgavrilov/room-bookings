import R from 'ramda';
import moment from '../moment';

import { getUniqueRoomKey } from '../utils/keys';
import { relativeTime } from '../utils/dates';

const ROOMS_OPEN = moment.duration("08:00");
const ROOMS_CLOSE = moment.duration("23:30");

const reClosed = /(UCL|Room|Rm\.)\sClosed/i;

function closure(booking) {
  const { contact, description } = booking;
  return reClosed.test(contact) || reClosed.test(description);
}

function openingAndClosing(date, bookings) {

  date = moment(date).clone().startOf("day"); // make sure we're at 00:00 London time

  const t = relativeTime(date);

  let opens = t(ROOMS_OPEN);
  let closes = t(ROOMS_CLOSE);

  bookings = R.compose(
    R.dropWhile((booking) => {
      if (closure(booking) && (booking.end_time.isSameOrAfter(t("21:00")) ||
                               booking.end_time.isSameOrAfter(closes))) {
        closes = booking.start_time
        return true;
      }
      return false;
    }),
    R.reverse,
    R.sortBy((booking) => booking.end_time.toDate())
  )(bookings);

  bookings = R.compose(
    R.dropWhile((booking) => {
      if (closure(booking) && (booking.start_time.isSameOrBefore(t("10:00")) ||
                               booking.start_time.isSameOrBefore(opens))) {
        opens = booking.end_time
        return true;
      }
      return false;
    }),
    R.sortBy((booking) => booking.start_time.toDate())
  )(bookings);

  if (opens.isSameOrAfter(closes)) {
    return {
      closedAllDay: true,
      opens: null,
      closes: null,
      bookings
    }
  } else {
    return {
      closedAllDay: false,
      opens,
      closes,
      bookings
    }
  }
}

function types(booking) {
  booking.start_time = moment(booking.start_time);
  booking.end_time = moment(booking.end_time);
  return booking;
}

export default function structureBookings(date, bookings) {
  // TODO remove duplication of roomname, roomid?
  return R.compose(
    R.mapObjIndexed((bookings) => openingAndClosing(date, bookings)),
    R.groupBy(getUniqueRoomKey),
    R.map(types)
  )(bookings);
}
