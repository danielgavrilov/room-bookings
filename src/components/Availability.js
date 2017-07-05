import moment from '../moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Availability extends Component {

  static propTypes = {
    date: PropTypes.instanceOf(moment).required,
    bookings: PropTypes.arrayOf(PropTypes.object).required,
    from: PropTypes.number.required,
    to: PropTypes.number.required,
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
