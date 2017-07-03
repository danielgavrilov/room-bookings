import moment from 'moment';

export function getDateKey(date) {
  return moment(date).format("YYYY-MM-DD");
}

export function getUniqueRoomKey({ roomid, siteid }) {
  return siteid + "-" + roomid;
}
