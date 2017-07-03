import moment from 'moment';

const cache = {
  "2017-03-21": {
    requested: "2017-07-03T16:47:00.705Z",
    rooms: {
      "{siteid}-{roomid}-{class}": [
        {
            "slotid": 991362,
            "start_time": "2017-07-03T09:00:00+01:00",
            "end_time": "2017-07-03T17:00:00+01:00",
            "description": "UCL Contracted Rooms",
            "phone": null,
            "weeknumber": 45.0,
            "contact": "Room Closed"
        }
      ]
    }
  }
}

const cache = {};

// startDate & endDate are both inclusive
export function getAllBookings({ startDate, endDate }) {
  const start = moment(startDate).startOf("day").toDate();
  const end = moment(endDate).endOf("day").toDate();

}
