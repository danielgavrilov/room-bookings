export function getUniqueRoomKey({ roomid, siteid, classification }) {
  // need to use classification because roomid and siteid alone are
  // not enough :|
  return roomid + "-" + siteid + "-" + classification;
}
