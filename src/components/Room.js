import moment from '../moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VisibilitySensor from './VisibilitySensor';

import Availability from '../containers/Availability';
import getClassificationName from '../utils/classification-name';

class Room extends Component {

  static propTypes = {
    room: PropTypes.object,
    active: PropTypes.bool,
    diary: PropTypes.object
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

    const { room, diary } = this.props;

    const {
      closedAllDay,
      opens,
      closes,
      bookings,
      available
    } = diary || {}; // prevent error if diary === undefined

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
        <div className={classNames("room", { "closed": closedAllDay })}>

          <div className="room-info">
            <h3 className="room-name">{roomname}</h3>
            <div className="room-type">{type}</div>
            <div className="room-capacity">{capacity}</div>
          </div>

          <Availability closedAllDay={closedAllDay}
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
