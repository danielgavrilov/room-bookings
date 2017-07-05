import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from '../moment';

import { toggle } from '../utils/general';
import { getUniqueRoomKey } from '../utils/keys';
import SortTypes from '../utils/sort-types';
import SortHeader from './SortHeader';
import Room from './Room';

import './Rooms.css';

const SortBy = {
  NAME: "roomname",
  CLASSIFICATION: "classification",
  CAPACITY: "capacity"
}

class Rooms extends Component {

  static propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    bounds: PropTypes.arrayOf(moment)
  }

  constructor(props) {
    super(props);
    this.state = {
      sortBy: SortBy.NAME,
      sortOrder: SortTypes.ASC
    };
  }

  sortedRooms() {

    const { rooms } = this.props;
    const { sortBy, sortOrder } = this.state;

    let sortedRooms = rooms;

    if (sortBy !== null && sortOrder !== null) {
      const comparator = sortOrder === SortTypes.ASC ? R.ascend : R.descend;
      sortedRooms = R.sortWith([
        comparator(R.prop(sortBy)),
        R.ascend(R.prop(SortBy.NAME)) // always use room name as secondary sort
      ], sortedRooms);
    }

    return sortedRooms;
  }

  roomComponents() {
    const { date, roomDiaries } = this.props;
    return this.sortedRooms().map((room) => {
      const key = getUniqueRoomKey(room);
      const props = roomDiaries[key] != null ?
                    roomDiaries[key] :
                    { loading: true };
      return (
        <Room key={key}
              date={date}
              room={room}
              {...props} />
      );
    });
  }

  render() {

    const { sortBy, sortOrder } = this.state;

    return (
      <div>
        <div className="sorting">
          <SortHeader name="Room name"
                      order={sortBy === SortBy.NAME ? sortOrder : null}
                      className="room-name"
                      onClick={this.sortHandler(SortBy.NAME)} />
          <SortHeader name="Type"
                      order={sortBy === SortBy.CLASSIFICATION ? sortOrder : null}
                      className="room-type"
                      onClick={this.sortHandler(SortBy.CLASSIFICATION)} />
          <SortHeader name="Capacity"
                      order={sortBy === SortBy.CAPACITY ? sortOrder : null}
                      className="room-capacity"
                      onClick={this.sortHandler(SortBy.CAPACITY)} />
        </div>
        <div className={classNames("rooms", { loading: this.props.loading })}>
          {this.roomComponents()}
        </div>
      </div>
    )
  }

  sortHandler(property) {
    return () => {
      this.sortBy(property);
    }
  }

  sortBy(property) {
    const sortOrder = (this.state.sortBy === property) ?
                      toggle(this.state.sortOrder, Object.values(SortTypes)) :
                      SortTypes.ASC;
    this.setState({
      sortBy: property,
      sortOrder
    });
  }

}

const mapStateToProps = (state, ownProps) => {
  const { active, date, loading, roomDiaries } = state;
  return {
    active,
    date,
    loading,
    roomDiaries
  };
}

export default connect(
  mapStateToProps
)(Rooms);
