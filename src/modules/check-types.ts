import { DailyVarString, HourlyVarString, TimeSpan } from '../types';

/**
 * Check if the stationCode is a string or number, if not throw a TypeError
 * @param stationCode string | number
 */
function stationCode(stationCode: unknown): void {
   if (Array.isArray(stationCode)) {
      stationCode.forEach((code: unknown) => checkStationCode(code));
   } else {
      checkStationCode(stationCode);
   }
}

function checkStationCode(stationCode: unknown): void {
   if (typeof stationCode !== 'string' && typeof stationCode !== 'number') {
      throw new TypeError(`stationCode (${stationCode}) must be a string or a number`);
   }
}

/**
 * Check if vars is an array of strings or single string.
 * Check for if every string is a valid DailyVarsString.
 * @param vars string | string[]
 */
function vars(
   vars: string | string[],
   validVars: DailyVarString[] | HourlyVarString[]
): void {
   if (typeof vars === 'string') {
      checkVarsError(vars, validVars);
   } else {
      vars.forEach((varString: string) => checkVarsError(varString, validVars));
   }
}

/**
 * Checks if the passed string is a valid VarString, throw an error if it is not.
 * @param findVar
 * @param validVars
 */
function checkVarsError(findVar: string, validVars: DailyVarString[] | HourlyVarString[]): void {
   const index = validVars.findIndex((key: string) => key === findVar);

   if (index === -1) {
      throw new Error(`Invalid key in VARS: ${findVar}`);
   }
}

/**
 * check if the passed timeSpan is the right type and format
 * @param timeSpan any
 */
function timeSpan(timeSpan: any): void {
   if (!timeSpan?.start || !timeSpan?.end) throw new Error('timeSpan is not in the correct format');

   checkTimeSpanErrors(timeSpan.start);
   checkTimeSpanErrors(timeSpan.end);
}

/**
 * Check if the timeSpan key is of type string and the correct length
 * @param timeSpan
 */
function checkTimeSpanErrors(timeSpan: unknown): void {
   if (typeof timeSpan !== 'string') throw new TypeError('timeSpan values must be of type string');

   if (timeSpan.length !== 8 && timeSpan.length !== 10) {
      throw new Error(`timeSpan value '${timeSpan}' does not have the correct length`);
   }
}

/**
 * Check if inseason is of type boolean and if timespan is defined
 * @param inSeason 
 * @param timeSpan 
 */
function inSeason(inSeason: unknown, timeSpan: TimeSpan): void {
   if (typeof inSeason !== 'boolean') throw new TypeError('inSeason must be of type boolean');
   if (!timeSpan) throw new Error('Missing timeSpan');
}

export default {
   stationCode,
   vars,
   timeSpan,
   inSeason
};