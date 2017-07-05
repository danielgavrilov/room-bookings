import R from 'ramda';
import moment from '../moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const START = 8;
const END = 24;

function scaleTime(time) {
  const hours = time.seconds() / 3600;
  return scaleHours(hours);
}

function scaleHours(hours) {
  return (hours - START) / (END - START);
}

function perc(fraction) {
  return (fraction * 100) + "%";
}

class Availability extends Component {

  static propTypes = {
    date: PropTypes.instanceOf(moment),
    loading: PropTypes.bool,
    closedAllDay: PropTypes.bool,
    opens: PropTypes.instanceOf(moment),
    closes: PropTypes.instanceOf(moment),
    bookings: PropTypes.arrayOf(PropTypes.object)
  }

  ticks() {
    return (
      <div className="ticks">
        {R.range(START+1, END).map((h) => (
          <div key={"hour-"+h} className="hour-tick" style={{ left: perc(scaleHours(h)) }}></div>
        ))}
        {R.range(START, END).map((h) => h + 0.5).map((h) => (
          <div key={"half-hour-"+h} className="half-hour-tick" style={{ left: perc(scaleHours(h)) }}></div>
        ))}
      </div>
    )
  }

  render() {

    return (
      <div className="room-availability">
        <div className="bar">
          {this.ticks()}
        </div>
      </div>
    )
  }

}

export default Availability;
