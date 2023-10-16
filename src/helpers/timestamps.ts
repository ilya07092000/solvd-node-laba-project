/**
 * returns timestamp in miliseconds in future increased by minutes argument
 */
const getFutureTimestampByMinutes = (minutes: number = 1) =>
  Date.now() + minutes * 60000;

export { getFutureTimestampByMinutes };
