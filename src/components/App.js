import React, { Component } from 'react';
import { connect } from 'react-redux';

import Rooms from './Rooms';
import Search from './Search';

import './App.css';

class App extends Component {
  render() {
    const { error } = this.props;
    return (
      <div className="container">

        <header className="header">
          <h1>UCL Room Bookings</h1>
        </header>

        <Search />

        { error ?
          <div className="error">
            <p>Encountered error: {error.message || error.toString()}</p>
          </div> :
          null
        }

        <Rooms />

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

function mapStateToProps(state) {
  return {
    error: state.error
  }
}

export default connect(
  mapStateToProps
)(App);
