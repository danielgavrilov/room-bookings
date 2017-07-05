import R from 'ramda';
import moment from '../moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const START = 8;
const END = 24;

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
        {R.range(1,END-START).map((i) => (
          <div key={"hour-"+i} className="hour-tick" style={{ left: `${i/(END-START)*100}%` }}></div>
        ))}
        {R.range(0,END-START).map((i) => (
          <div key={"half-hour-"+i} className="half-hour-tick" style={{ left: `${(i+0.5)/(END-START)*100}%` }}></div>
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
