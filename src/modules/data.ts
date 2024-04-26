import queryString from './query-string.js';
import parser from './parser.js';
import helper from './helper.js';

import { HourlyVars, DailyVars, TimeSpan, StationCode } from '../types/index.js';

/**
 * get and parse the knmi data
 * @param url 
 * @param params 
 */
async function get(
   url: string,
   params: {
    stationCode: StationCode,
    variables?: DailyVars | HourlyVars,
    timeSpan?: TimeSpan,
    inSeason?: boolean
  }
) {
   const options: RequestInit = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString.create(
         params.stationCode,
         params.variables,
         params.timeSpan,
         params.inSeason
      )
   };

   const res = await fetch(url, options);
   const data = await res.text();
   const parsedData = parser.data(data, params.stationCode);

   helper.checkStationExists(parsedData, params.stationCode);

   return parsedData;
}

export default {
   get
};
