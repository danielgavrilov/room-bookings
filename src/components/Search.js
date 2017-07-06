import React from 'react';
import moment from '../moment';
import { connect } from 'react-redux'
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import './Search.css';

import {
  searchDate,
  searchHours,
  searchStart,
  searchEnd,
  searchCapacity,
  fetchBookings
} from '../actions';

const Search = ({
  active,
  date,
  between,
  selectDate,
  selectHours,
  selectStart,
  selectEnd
}) => (
  <div className="search-form">
    <div className="textual">
      <form id="search">
        I need a room for
        <select name="hours" id="hours" defaultValue="0" onChange={selectHours}>
          <option value="0">...</option>
          <option value="0.5">30min</option>
          <option value="1.0">1h</option>
          <option value="1.5">1h 30min</option>
          <option value="2.0">2h</option>
          <option value="2.5">2h 30min</option>
          <option value="3.0">3h</option>
          <option value="3.5">3h 30min</option>
          <option value="4.0">4h</option>
          <option value="4.5">4h 30min</option>
          <option value="5.0">5h</option>
          <option value="5.5">5h 30min</option>
          <option value="6.0">6h</option>
          <option value="6.5">6h 30min</option>
          <option value="7.0">7h</option>
          <option value="7.5">7h 30min</option>
          <option value="8.0">8h</option>
          <option value="8.5">8h 30min</option>
          <option value="9.0">9h</option>
          <option value="9.5">9h 30min</option>
          <option value="10.0">10h</option>
          <option value="10.5">10h 30min</option>
          <option value="11.0">11h</option>
        </select>
        between
        <select name="start" id="start" defaultValue="08:00" onChange={selectStart}>
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
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
          <option value="18:00">18:00</option>
          <option value="18:30">18:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
          <option value="22:00">22:00</option>
          <option value="22:30">22:30</option>
          <option value="23:00">23:00</option>
          <option value="23:30">23:30</option>
        </select>
        and
        <select name="end" id="end" defaultValue="14:00" onChange={selectEnd}>
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
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
          <option value="18:00">18:00</option>
          <option value="18:30">18:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
          <option value="22:00">22:00</option>
          <option value="22:30">22:30</option>
          <option value="23:00">23:00</option>
          <option value="23:30">23:30</option>
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
      const hours = parseFloat(value);
      dispatch(searchHours(hours));
    },
    selectStart: (event) => {
      const value = event.target.value;
      dispatch(searchStart(value));
    },
    selectEnd: (event) => {
      const value = event.target.value;
      dispatch(searchEnd(value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
