import React from 'react';

const Search = () => (
  <div className="query">
    <p>
      I need a room for
      <select name="hours" id="hours" defaultValue="...">
        <option value="...">...</option>
        <option value="0.5">0.5</option>
        <option value="1.0">1.0</option>
        <option value="1.5">1.5</option>
        <option value="2.0">2.0</option>
        <option value="2.5">2.5</option>
        <option value="3.0">3.0</option>
        <option value="3.5">3.5</option>
        <option value="4.0">4.0</option>
        <option value="4.5">4.5</option>
        <option value="5.0">5.0</option>
        <option value="5.5">5.5</option>
        <option value="6.0">6.0</option>
      </select>
      hours between
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
    </p>
  </div>
)

export default Search;
