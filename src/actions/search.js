import { makeAction } from './utils';

export const SEARCH_DATE = "SEARCH_DATE";
export const SEARCH_HOURS = "SEARCH_HOURS";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_END = "SEARCH_END";
export const SEARCH_CAPACITY = "SEARCH_CAPACITY";

export const searchDate = makeAction(
  SEARCH_DATE,
  "date"
);

export const searchHours = makeAction(
  SEARCH_HOURS,
  "hours"
);

export const searchStart = makeAction(
  SEARCH_START,
  "start"
);

export const searchEnd = makeAction(
  SEARCH_END,
  "end"
);

export const searchCapacity = makeAction(
  SEARCH_CAPACITY,
  "capacity"
);
