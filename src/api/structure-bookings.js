import R from 'ramda';
import moment from '../moment';

import { getUniqueRoomKey } from '../utils/keys';

function types(booking) {
  booking.start_time = moment(booking.start_time);
  booking.end_time = moment(booking.end_time);
  return booking;
}

export default function structureBookings(bookings) {
  // TODO remove duplication of roomname, roomid?
  return R.compose(
    R.groupBy(getUniqueRoomKey),
    R.map(types)
  )(bookings);
}
