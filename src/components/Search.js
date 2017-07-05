import React from 'react';
import moment from '../moment';
import { connect } from 'react-redux'
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import './Search.css';

import {
  searchDate,
  searchHours,
  searchBetween,
  searchCapacity,
  fetchBookings
} from '../actions';

const Search = ({
  active,
  date,
  between,
  selectDate,
  selectHours
}) => (
  <div className="search-form">
    <div className="textual">
      <form id="search" className="search-form">
        I need a room for
        <select name="hours" id="hours" defaultValue="..." onChange={selectHours}>
          <option value="...">...</option>
          <option value="00:30">30min</option>
          <option value="01:00">1h</option>
          <option value="01:30">1h 30min</option>
          <option value="02:00">2h</option>
          <option value="02:30">2h 30min</option>
          <option value="03:00">3h</option>
          <option value="03:30">3h 30min</option>
          <option value="04:00">4h</option>
          <option value="04:30">4h 30min</option>
          <option value="05:00">5h</option>
          <option value="05:30">5h 30min</option>
          <option value="06:00">6h</option>
          <option value="06:30">6h 30min</option>
          <option value="07:00">7h</option>
        </select>
        between
        <select name="start" id="start" defaultValue="08:00">
          <option value="08:00">08:00</option>
          <option value="08:30">08:30</option>
          <option value="09:00">09:00</option>
          <option value="09:30">09:30</option>
          <option value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
        </select>
        and
        <select name="end" id="end" defaultValue="14:00">
          <option value="08:00">08:00</option>
          <option value="08:30">08:30</option>
          <option value="09:00">09:00</option>
          <option value="09:30">09:30</option>
          <option value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
        </select>
      </form>
    </div>

    <div className="calendar">
      <DayPicker
        onDayClick={selectDate}
        selectedDays={[date.toDate()]}
        enableOutsideDays
        firstDayOfWeek={1}
      />
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { active, date, between } = state;
  return {
    active,
    date,
    between
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectDate: (date) => {
      date = moment(date).startOf("day");
      dispatch(searchDate(date));
      dispatch(fetchBookings(date));
    },
    selectHours: (event) => {
      const value = event.target.value;
      const hours = moment.duration(value);
      dispatch(searchHours(hours));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
