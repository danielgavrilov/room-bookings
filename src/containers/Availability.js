import R from 'ramda';
import moment from '../moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { clamp } from '../utils/general';

import {
  START_HOUR,
  END_HOUR
} from '../config';

const unitClamp = clamp(0, 1);

function timeToHours(time) {
  return time.hours() + time.minutes() / 60 + time.seconds() / 3600;
}

function scaleTime(time) {
  const hours = timeToHours(time);
  return scaleHours(hours);
}

function scaleHours(hours) {
  return unitClamp((hours - START_HOUR) / (END_HOUR - START_HOUR));
}

function getHour(clock) {
  const duration = moment.duration(clock)
  return timeToHours(duration);
}

function formatHour(hour) {
  const suffix = hour >= 12 ? "pm" : "am";
  const prefix = hour >= 13 ? hour - 12 : hour;
  return prefix + suffix;
}

function perc(fraction) {
  return (fraction * 100) + "%";
}

class Availability extends Component {

  static propTypes = {
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
        {R.range(START_HOUR+1, END_HOUR).map((h) => (
          <div key={"hour-tick-"+h}
               className="hour-tick"
               style={{ left: perc(scaleHours(h)) }} />
        ))}
        {R.range(START_HOUR, END_HOUR).map((h) => h + 0.5).map((h) => (
          <div key={"half-hour-tick-"+h}
               className="half-hour-tick"
               style={{ left: perc(scaleHours(h)) }} />
        ))}
        {R.range(START_HOUR+1, END_HOUR).map((h) => (
          <div key={"hour-label-"+h}
               className={classNames("hour-label", {
                 "hour-label-odd": !!(h % 2),
                 "hour-label-even": !(h % 2)
               })}
               style={{ left: perc(scaleHours(h)) }}>
            {formatHour(h)}
          </div>
        ))}
        <div className="closed-note">
          <span>Closed all day</span>
        </div>
      </div>
    )
  }

  shading() {
    const { active, between } = this.props;
    const [shadeStartHour, shadeEndHour] = between.map(getHour);
    let shades = [];
    if (active) {
      if (shadeStartHour >= START_HOUR) {
        const left = scaleHours(START_HOUR);
        const width = scaleHours(shadeStartHour) - left;
        shades.push((
          <div key="before" className="shade shade-before" style={{ left: perc(left), width: perc(width) }} />
        ));
      }
      if (shadeEndHour <= END_HOUR) {
        const left = scaleHours(shadeEndHour);
        const width = scaleHours(END_HOUR) - left;
        shades.push((
          <div key="after" className="shade shade-after" style={{ left: perc(left), width: perc(width) }} />
        ));
      }
    }
    return (
      <div className="shading">
        {shades}
      </div>
    );
  }

  render() {
    return (
      <div className="room-availability">
        <div className="bar">
          {this.availableIntervals()}
          {this.bookings()}
          {this.ticks()}
          {this.shading()}
        </div>
      </div>
    )
  }

}

const mapStateToProps = ({ active, between }) => {
  return {
    active,
    between
  }
}

export default connect(
  mapStateToProps
)(Availability);
