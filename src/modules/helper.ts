import typeCheck from './check-types.js';
import { DAILY, HOURLY, DAILYVARS, HOURLYVARS } from '../constants/index.js';
import { StationCode, StationData } from '../types/index.js';

/**
 * Check if the params are in the correct format
 * @param params 
 * @param variableType
 */
function checkParams(
   params: {
    stationCode: unknown,
    variables?: any,
    timeSpan?: any,
    inSeason?: unknown
  },
   variableType: 'daily' | 'hourly',
): void {
   typeCheck.stationCode(params.stationCode);
   if (params.variables && variableType === DAILY) typeCheck.vars(params.variables, DAILYVARS);
   if (params.variables && variableType === HOURLY) typeCheck.vars(params.variables, HOURLYVARS);
   if (params.timeSpan) typeCheck.timeSpan(params.timeSpan);
   if (params.inSeason) typeCheck.inSeason(params.inSeason, params.timeSpan);
}

/**
 * Check if a string contains a station code
 * @param row 
 * @param stationCode 
 * @returns boolean
 */
function includesStationCode(row: string, stationCode: StationCode): boolean {
   let includes = false;

   if (Array.isArray(stationCode)) {
      stationCode.forEach((code: string | number) => {
         if (row.includes(code + ':')) includes = true;
      });
   } else {
      if (stationCode === 'ALL' && row.includes(':  ')) includes = true;
      if (row.includes(stationCode + ':  ')) includes = true;
   }

   return includes;
}

/**
 * Check if all the given station codes exist in the parsed data
 * @param data 
 * @param stationCode 
 */
function checkStationExists(data: StationData[], stationCode: StationCode): void {
   if (stationCode === 'ALL') return;

   if (Array.isArray(stationCode)) {
      const stations = data.map((stationData: StationData) => stationData.station.code);

      stationCode.forEach((code: string | number, i: number) => {
         if (code != stations[i]) {
            throw new Error(`Station ${code} doesn't exist`);
         }
      });
   } else {
      if (data[0].station.code != stationCode) {
         throw new Error(`Station ${stationCode} doesn't exist`);
      }
   }
}

export default {
   checkParams,
   includesStationCode,
   checkStationExists
};
