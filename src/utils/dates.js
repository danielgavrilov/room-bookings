import { curry } from 'ramda';
import moment from '../moment';

function _relativeTime(date, timeOfDay) {
  const duration = moment.duration(timeOfDay);
  return date.clone().startOf("day").add(duration);
}

export const relativeTime = curry(_relativeTime);

export function earliest(time1, time2) {
  return time1.isBefore(time2) ? time1 : time2;
}

export function latest(time1, time2) {
  return time1.isBefore(time2) ? time2 : time1;
}

export function intersection(interval1, interval2) {
  const start_time = latest(interval1.start_time, interval2.start_time);
  const end_time = earliest(interval1.end_time, interval2.end_time);
  if (start_time.isBefore(end_time)) {
    return { start_time, end_time };
  } else {
    return null;
  }
}

export function intersections(intervals, interval) {
  return intervals
    .map((i) => intersection(i, interval))
    .filter((interval) => interval != null);
}
