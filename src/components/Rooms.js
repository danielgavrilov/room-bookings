import R from 'ramda';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    bounds: PropTypes.instanceOf(Date)
  }

  constructor(props) {
    super(props);
    this.state = {
      sortBy: SortBy.NAME,
      sortOrder: SortTypes.ASC
    };
  }

  render() {
    const { rooms, bounds } = this.props;
    const { sortBy, sortOrder } = this.state;
    let sortedRooms = rooms;
    if (sortBy !== null && sortOrder !== null) {
      const comparator = sortOrder === SortTypes.ASC ? R.ascend : R.descend;
      sortedRooms = R.sortWith([
        comparator(R.prop(sortBy)),
        R.ascend(R.prop(SortBy.NAME))
      ], sortedRooms);
    }
    return (
      <div>
        <div className="sorting">
          <SortHeader name="Room name"
                      order={sortBy === SortBy.NAME ? sortOrder : null}
                      className="room-name"
                      onClick={this._sortHandler(SortBy.NAME)} />
          <SortHeader name="Type"
                      order={sortBy === SortBy.CLASSIFICATION ? sortOrder : null}
                      className="room-type"
                      onClick={this._sortHandler(SortBy.CLASSIFICATION)} />
          <SortHeader name="Capacity"
                      order={sortBy === SortBy.CAPACITY ? sortOrder : null}
                      className="room-capacity"
                      onClick={this._sortHandler(SortBy.CAPACITY)} />
        </div>
        <div className="rooms">
          {sortedRooms.map((room) => (
            <Room room={room} key={getUniqueRoomKey(room)} />
          ))}
        </div>
      </div>
    )
  }

  _sortHandler(property) {
    return () => {
      this._sortBy(property);
    }
  }

  _sortBy(property) {
    const sortOrder = (this.state.sortBy === property) ?
                      toggle(this.state.sortOrder, Object.values(SortTypes)) :
                      SortTypes.ASC;
    this.setState({
      sortBy: property,
      sortOrder
    });
  }

}

export default Rooms;
