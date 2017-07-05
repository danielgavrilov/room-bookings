// Custom moment-timezone data that only includes Europe/London timezone

import data from './data.json';
import moment from 'moment-timezone/moment-timezone';

moment.tz.load(data);
moment.tz.setDefault("Europe/London");

export default moment;
