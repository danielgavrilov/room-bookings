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
          <h1>UCL Room Bookings</h1>
        </header>

        <Search />

        <Rooms rooms={rooms} />

        <footer>
          <p>
            This is an unofficial UCL room bookings website built using the <a href="https://uclapi.com">UCL API</a>.
            The official one can be found <a href="https://roombooking.ucl.ac.uk">here</a>.
          </p>
          <p>
            Made by <a href="http://gavrilov.co.uk">Daniel Gavrilov</a>. Source code available on <a href="https://github.com/danielgavrilov/room-bookings">GitHub</a>.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
