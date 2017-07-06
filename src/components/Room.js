import moment from '../moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from './VisibilitySensor';

import Availability from './Availability';
import getClassificationName from '../utils/classification-name';

class Room extends Component {

  static propTypes = {
    diaryDate: PropTypes.instanceOf(moment),
    room: PropTypes.object,
    loading: PropTypes.bool,
    closedAllDay: PropTypes.bool,
    opens: PropTypes.instanceOf(moment),
    closes: PropTypes.instanceOf(moment),
    bookings: PropTypes.arrayOf(PropTypes.object),
    available: PropTypes.arrayOf(PropTypes.object)
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible;
  }

  onVisible(visible) {
    this.setState({ visible });
  }

  render() {

    const {
      diaryDate,
      room,
      loading,
      closedAllDay,
      opens,
      closes,
      bookings,
      available
    } = this.props;

    const {
      roomname,
      capacity,
      classification
    } = room;

    // attempt to find description for acronym
    // if none exists default to acronym, e.g. LT for Lecture Theatre
    const type = getClassificationName(classification);

    return (
      <VisibilitySensor onChange={this.onVisible.bind(this)}
                        partialVisibility={true}
                        scrollCheck={true}
                        scrollThrottle={50}
                        intervalCheck={true}
                        intervalDelay={3000}
                        offset={{ top: -1000, bottom: -1000 }}>
        <div className="room">

          <div className="room-info">
            <h3 className="room-name">{roomname}</h3>
            <div className="room-type">{type}</div>
            <div className="room-capacity">{capacity}</div>
          </div>

          <Availability diaryDate={diaryDate}
                        loading={loading}
                        closedAllDay={closedAllDay}
                        opens={opens}
                        closes={closes}
                        bookings={bookings}
                        available={available} />

        </div>
      </VisibilitySensor>
    )
  }

}

export default Room;
