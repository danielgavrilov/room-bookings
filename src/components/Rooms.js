import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from '../moment';

import rooms from '../data/rooms.json';
import { toggle } from '../utils/general';
import { getUniqueRoomKey } from '../utils/keys';
import SortOrder from '../utils/sort-order';
import SortBy from '../utils/sort-by.js';
import SortHeader from './SortHeader';
import RoomList from './RoomList';
import Room from './Room';

import './Rooms.css';

class Rooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortBy: SortBy.NAME,
      sortOrder: SortOrder.ASC
    };
  }

  render() {

    const { active, diaryDate, loading, roomDiaries, between } = this.props;
    const { sortBy, sortOrder } = this.state;

    return (
      <div>
        <div className="sorting">
          <SortHeader name="Room name"
                      sortOrder={sortBy === SortBy.NAME ? sortOrder : null}
                      className="room-name"
                      onClick={this.sortHandler(SortBy.NAME)} />
          <SortHeader name="Type"
                      sortOrder={sortBy === SortBy.CLASSIFICATION ? sortOrder : null}
                      className="room-type"
                      onClick={this.sortHandler(SortBy.CLASSIFICATION)} />
          <SortHeader name="Capacity"
                      sortOrder={sortBy === SortBy.CAPACITY ? sortOrder : null}
                      className="room-capacity"
                      onClick={this.sortHandler(SortBy.CAPACITY)} />
        </div>

        <RoomList className={classNames("rooms", { loading: this.props.loading })}
                  rooms={rooms}
                  diaryDate={diaryDate}
                  roomDiaries={roomDiaries}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  between={between}
                  loading={loading} />
      </div>
    )
  }

  sortHandler(property) {
    return () => {
      // fire 'refreshViewport' to force VisibilitySensor update
      window.dispatchEvent(new CustomEvent("refreshViewport"));
      this.sortBy(property);
    }
  }

  sortBy(property) {
    const sortOrder = (this.state.sortBy === property) ?
                      toggle(this.state.sortOrder, R.values(SortOrder)) :
                      SortOrder.ASC;
    this.setState({
      sortBy: property,
      sortOrder
    });
  }

}

const mapStateToProps = (state, ownProps) => {
  const { active, diaryDate, loading, roomDiaries, hours, between } = state;
  return {
    active,
    diaryDate,
    loading,
    roomDiaries,
    between
  };
}

export default connect(
  mapStateToProps
)(Rooms);
