import moment from '../moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Availability extends Component {

  static propTypes = {
    date: PropTypes.instanceOf(moment),
    loading: PropTypes.bool,
    closedAllDay: PropTypes.bool,
    opens: PropTypes.instanceOf(moment),
    closes: PropTypes.instanceOf(moment),
    bookings: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    return (
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
    )
  }

}

export default Availability;
