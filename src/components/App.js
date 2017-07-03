import React, { Component } from 'react';

import Rooms from './Rooms';
import Search from './Search';
import rooms from '../data/rooms.json';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">

        <header className="header">
          UCL Room Bookings
        </header>

        <Search />

        <Rooms rooms={rooms} />

        <footer>
          <p>
            This is an unofficial UCL room bookings website built using the <a href="http://uclapi.com">UCL API</a>.
            The official one is <a href="https://roombooking.ucl.ac.uk">here</a>.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
