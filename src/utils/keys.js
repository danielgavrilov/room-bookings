import moment from '../moment';

export function getDateKey(date) {
  return moment(date)
    .tz("Europe/London")
    .format("YYYY-MM-DD");
}

export function getUniqueRoomKey({ roomid, siteid }) {
  return siteid + "-" + roomid;
}
