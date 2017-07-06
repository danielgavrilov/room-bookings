import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import rooms from '../data/rooms.json';
import { toggle } from '../utils/general';
import { getUniqueRoomKey } from '../utils/keys';
import { relativeTime, intersections } from '../utils/dates';
import SortOrder from '../utils/sort-order';
import SortBy from '../utils/sort-by.js';
import SortHeader from './SortHeader';
import RoomList from './RoomList';

import './Rooms.css';

class Rooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortBy: SortBy.NAME,
      sortOrder: SortOrder.ASC
    };
  }

  results() {
    const { diaryDate, roomDiaries, hours, between } = this.props;
    const t = relativeTime(diaryDate);
    const boundsInterval = {
      start_time: t(between[0]),
      end_time: t(between[1])
    }
    return R.partition((room) => {
      const key = getUniqueRoomKey(room);
      const { available } = roomDiaries[key];
      const intervals = intersections(available, boundsInterval)
        .filter(({ start_time, end_time }) => {
          return (end_time - start_time) / (60*60*1000) >= hours;
        });
      return intervals.length > 0;
    }, rooms);
  }

  render() {

    const { active, diaryDate, loading, roomDiaries, between } = this.props;
    const { sortBy, sortOrder } = this.state;

    let results = rooms,
        rest = [];

    if (active && !R.equals(roomDiaries, {})) {
      ([results, rest] = this.results());
    }

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
                  rooms={results}
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
    hours,
    between
  };
}

export default connect(
  mapStateToProps
)(Rooms);
