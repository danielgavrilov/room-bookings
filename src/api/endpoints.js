import R from 'ramda';
import axios from 'axios';

const BASE_URL = "https://uclapi.com/roombookings"
const TOKEN = "uclapi-185f335809781b-69b449ec4bae9d-ec0730fa47fea9-5f1714806ba2a3";

function get(url, params) {
  return axios.get(BASE_URL + url, {
    params: {
      token: TOKEN,
      ...params
    }
  }).then((response) => response.data);
}

function getAllPages(url, params) {
  return get(url, params).then((data) => {
    if (data.next_page_exists) {
      return getAllPages(url, {
        page_token: data.page_token
      }).then((dataArray) => {
        return [data].concat(dataArray);
      });
    } else {
      return [data];
    }
  });
}

export function getBookings({ roomid, siteid, start, end }) {
  return getAllPages("/bookings", {
    roomid,
    siteid,
    start_datetime: start.format(),
    end_datetime: end.format()
  })
  .then((dataArray) => {
    return R.unnest(dataArray.map((data) => data.bookings));
  })
  .catch(function(error) {
    console.error(error);
    throw error;
  });
}
