import R from 'ramda';
import moment from '../moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const START = 8;
const END = 24;

function scaleTime(time) {
  const hours = time.hours() + time.minutes() / 60 + time.seconds() / 3600;
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
    bookings: PropTypes.arrayOf(PropTypes.object),
    available: PropTypes.arrayOf(PropTypes.object)
  }

  // an event is either 'booking' or 'available'
  plot(events, keyFunc, className="events", childClassName="event") {
    const eventComponents = events.map((event) => {
      const key = keyFunc(event);
      const left = scaleTime(event.start_time);
      const width = scaleTime(event.end_time) - left;
      return (
        <div key={key} className={childClassName} style={{ left: perc(left), width: perc(width) }}></div>
      );
    });
    return (
      <div className={className}>
        {eventComponents}
      </div>
    )
  }

  bookings() {
    const { closedAllDay, bookings } = this.props;
    if (closedAllDay === false && bookings) {
      const keyFunc = (booking) => `${booking.siteid}-${booking.slotid}-${booking.weeknumber}`;
      return this.plot(bookings, keyFunc, "bookings", "booking");
    }
    return null;
  }

  availableIntervals() {
    const { closedAllDay, available } = this.props;
    if (closedAllDay === false && available) {
      const keyFunc = (interval) => `${interval.start_time.format("HH:mm")}-${interval.end_time.format("HH:mm")}`;
      return this.plot(available, keyFunc, "available-intervals", "available");
    }
    return null;
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
          {this.availableIntervals()}
          {this.bookings()}
          {this.ticks()}
        </div>
      </div>
    )
  }

}

export default Availability;
