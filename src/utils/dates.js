import { curry } from 'ramda';
import moment from '../moment';

function _relativeTime(date, timeOfDay) {
  const duration = moment.duration(timeOfDay);
  return date.clone().startOf("day").add(duration);
}

export const relativeTime = curry(_relativeTime);
