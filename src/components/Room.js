import React from 'react';

import getClassificationName from '../utils/classification-name';

const Room = ({ room }) => {
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

      <div className="room-availability">
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
        <div className="half-hour first"></div>
        <div className="half-hour last"></div>
      </div>
    </div>
  )
}

export default Room;
