export function getDateKey(date) {
  return date.format("YYYY-MM-DD");
}

export function getUniqueRoomKey({ roomid, siteid }) {
  return siteid + "-" + roomid;
}
