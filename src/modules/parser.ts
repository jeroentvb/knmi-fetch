import helper from './helper';

import { StationData, StationCode } from '../types';

/**
 * Takes the knmi station data (txt) and parses it to usable json
 * @param data string
 * @returns object[]
 */
function data(data: string, stationCode: StationCode): StationData[] {
   let legend: string[];
   const stationInfo: StationData['station'][] = [];
   const stationData: StationData[] = [];

   const dataArray: StationData['data'] = data
   // Split string at newline characters
      .split('\n')
   // Remove all comments from the data.
   // Get the legend and station info
      .filter((row: string) => {
      // Get the legend
         if (row.includes('# STN,YYYYMMDD')) {
            legend = parseLegend(row);
         }

         // Get the station info
         if (row.includes('#') && helper.includesStationCode(row, stationCode)) {
            const stationString = row.split(' ').filter(item => item);

            stationInfo.push(createStationObject(stationString));
         }

         return !row.includes('#') && row !== '';
      })
   // Create an array from the data string and remove spaces
      .map((row: string) => {
         return row
            .split(',')
            .map((item: string) => item.trim());
      })
   // Return the array of values as a usable object
      .map((values: string[]) => {
         const data: { [key: string]: string } = {};

         legend.forEach((item: string, i: number) => {
            data[item] = values[i];
         });

         return data;
      });

   stationInfo.forEach((station: StationData['station'], i: number) => {
      stationData[i] = {
         station,
         data: dataArray.filter(dataObj => dataObj.STN == station.code)
      };
   });

   return stationData;
}

/**
 * Parse the string that contains variable names to an array of variable names.
 * @param legend
 * @returns string[]
 */
function parseLegend(legend: string): string[] {
   return legend
      .replace('# ', '')
      .split(',')
      .map((item: string) => item.trim());
}

/**
 * Return a station info object
 * @param str 
 * @param stationCode
 * @returns Data['station']
 */
function createStationObject(str: string[]): StationData['station'] {
   const stationName = str
      .filter((item: string, i) => i > 4)
      .map((item: string) => item.split('\r')[0])
      .join(' ');

   return {
      name: stationName,
      code: parseInt(str[1].replace(':', '')),
      coordinates: {
         lat: parseFloat(str[3]),
         lng: parseFloat(str[2]),
      },
      altitude: parseFloat(str[4])
   };
}

export default {
   data
};
