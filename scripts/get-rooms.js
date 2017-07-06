const R = require('ramda');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = "https://uclapi.com/roombookings"
const TOKEN = "uclapi-185f335809781b-69b449ec4bae9d-ec0730fa47fea9-5f1714806ba2a3";

const prettyJSON = (x) => JSON.stringify(x, null, 2);

function get(url, params) {
  return axios.get(BASE_URL + url, {
    params: Object.assign({}, params, {
      token: TOKEN
    })
  }).then((response) => response.data);
}

function getRooms() {
  return get("/rooms")
    .then((data) => data.rooms)
    .catch((error) => console.error(error));
}

function combineRooms(rooms) {
  if (rooms.length > 1) {
    const room = R.last(R.sortBy(R.prop("capacity"), rooms));
    room.classification = "MP";
    return room;
  } else {
    return rooms[0];
  }
}

getRooms().then((rooms) => {
  rooms = R.compose(
    R.sortBy(R.prop("roomname")),
    R.values,
    R.mapObjIndexed(combineRooms),
    R.groupBy((room) => room.siteid + "-" + room.roomname)
  )(rooms);
  const p = path.join(__dirname, "..", "src", "data", "rooms.json");
  fs.writeFile(p, prettyJSON(rooms), "utf8", () => null);
  console.log("Wrote rooms.json");
});
