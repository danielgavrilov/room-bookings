import moment from '../moment';
import React from 'react';
import PropTypes from 'prop-types';

import Availability from './Availability';
import getClassificationName from '../utils/classification-name';

const Room = ({
  date,
  room,
  loading,
  closedAllDay,
  opens,
  closes,
  bookings
}) => {

  const {
    roomname,
    capacity,
    classification
  } = room;

  // attempt to find description for acronym
  // if none exists default to acronym, e.g. LT for Lecture Theatre
  const type = getClassificationName(classification);

  return (
    <div className="room">

      <div className="room-info">
        <h3 className="room-name">{roomname}</h3>
        <div className="room-type">{type}</div>
        <div className="room-capacity">{capacity}</div>
      </div>

      <Availability date={date}
                    loading={loading}
                    closedAllDay={closedAllDay}
                    opens={opens}
                    closes={closes}
                    bookings={bookings} />

    </div>
  )
}

Room.propTypes = {
  date: PropTypes.instanceOf(moment)
}

export default Room;
