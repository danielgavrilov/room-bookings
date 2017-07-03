export function getUniqueRoomKey({ roomid, siteid }) {
  return siteid + "-" + roomid;
}
