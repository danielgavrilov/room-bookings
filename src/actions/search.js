import { makeAction } from './utils';

export const SEARCH_DATE = "SEARCH_DATE";
export const SEARCH_HOURS = "SEARCH_HOURS";
export const SEARCH_BETWEEN = "SEARCH_BETWEEN";
export const SEARCH_CAPACITY = "SEARCH_CAPACITY";

export const searchDate = makeAction(
  SEARCH_DATE,
  "date"
);

export const searchHours = makeAction(
  SEARCH_HOURS,
  "hours"
);

export const searchBetween = makeAction(
  SEARCH_BETWEEN,
  "between"
);

export const searchCapacity = makeAction(
  SEARCH_CAPACITY,
  "capacity"
);
