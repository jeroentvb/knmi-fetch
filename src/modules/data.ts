import fetch, { RequestInit } from 'node-fetch';

import queryString from './query-string';
import parser from './parser';
import helper from './helper';

import { HourlyVars, DailyVars, TimeSpan, StationCode } from '../types';

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
