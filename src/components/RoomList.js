import R from 'ramda';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from '../moment';

import { getUniqueRoomKey } from '../utils/keys';
import SortOrder from '../utils/sort-order';
import SortBy from '../utils/sort-by';
import Room from './Room';

class RoomList extends Component {

  static propTypes = {
    className: PropTypes.string,
    diaryDate: PropTypes.instanceOf(moment).isRequired,
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    roomDiaries: PropTypes.object.isRequired,
    sortOrder: PropTypes.oneOf(R.values(SortOrder)).isRequired,
    sortBy: PropTypes.oneOf(R.values(SortBy)).isRequired,
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false
  }

  sortedRooms() {

    const { rooms, sortBy, sortOrder } = this.props;

    let sortedRooms = rooms;

    if (sortBy !== null && sortOrder !== null) {
      const comparator = sortOrder === SortOrder.ASC ? R.ascend : R.descend;
      sortedRooms = R.sortWith([
        comparator(R.prop(sortBy)),
        R.ascend(R.prop(SortBy.NAME)) // always use room name as secondary sort
      ], sortedRooms);
    }

    return sortedRooms;
  }

  roomComponents() {
    const { diaryDate, roomDiaries } = this.props;
    return this.sortedRooms().map((room) => {
      const key = getUniqueRoomKey(room);
      const props = roomDiaries[key] != null ?
                    roomDiaries[key] :
                    { loading: true };
      return (
        <Room key={key}
              diaryDate={diaryDate}
              room={room}
              {...props} />
      );
    });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        {this.roomComponents()}
      </div>
    )
  }

}

export default RoomList;
