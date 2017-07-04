import React from 'react';

import './Search.css';

const Search = () => (
  <form id="search" className="search-form">
    I need a room for
    <select name="hours" id="hours" defaultValue="...">
      <option value="...">...</option>
      <option value="0:30">30min</option>
      <option value="1:00">1h</option>
      <option value="1:30">1h 30min</option>
      <option value="2:00">2h</option>
      <option value="2:30">2h 30min</option>
      <option value="3:00">3h</option>
      <option value="3:30">3h 30min</option>
      <option value="4:00">4h</option>
      <option value="4:30">4h 30min</option>
      <option value="5:00">5h</option>
      <option value="5:30">5h 30min</option>
      <option value="6:00">6h</option>
      <option value="6:30">6h 30min</option>
      <option value="7:00">7h</option>
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
)

export default Search;
