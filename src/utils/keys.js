export function getDateKey(date) {
  return date.tz("Europe/London")
             .format("YYYY-MM-DD");
}

export function getUniqueRoomKey({ roomid, siteid }) {
  return siteid + "-" + roomid;
}
