import helper from './helper';

import { StationCode, StationData } from '../types';

/**
 * Takes the knmi station data (txt) and parses it to usable json
 * @param data string
 * @returns object[]
 */
function data(data: string, stationCode: StationCode): StationData[] {
   const splitData = data.split('\n');
   const legend = getLegend(splitData);
   const stationInfo: StationData['station'][] = getStations(splitData, stationCode);

   const dataArray: StationData['data'] = data
      // Split string at newline characters
      .split('\n')
      // Remove all comments from the data.
      // Get the legend and station info
      .filter((row: string) => !row.includes('#') && row !== '')
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

   const stationData: StationData[] = stationInfo.map((station: StationData['station']) => {
      return {
         station,
         data: dataArray.filter(dataObj => dataObj.STN == station.code)
      };
   });

   return stationData;
}

function getLegend(data: string[]) {
   const legendRow = data.find(row => row.includes('# STN,YYYYMMDD')) as string;
   return parseLegend(legendRow);
}

function getStations(data: string[], stationCode: StationCode): StationData['station'][] {
   let isStationRow = false;
   const stationRows: string[] = [];

   for (const row of data) {
      if (row.includes('STN') && row.includes('NAME')) {
         isStationRow = true;
      } else if (row.includes('# YYYYMMDD') || row.includes('# STN,YYYYMMDD')) {
         break;
      } else if (isStationRow && helper.includesStationCode(row, stationCode)) {
         stationRows.push(row);
      }
   }

   return stationRows.map(row => {
      const stationString = row.split(' ').filter(Boolean);
      return createStationObject(stationString);
   });
}

/**
 * Parse the string that contains variable names to an array of variable names.
 * @param legend - # STN,YYYYMMDD,   HH,   DD,   FH,   FF,   FX
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
 * @param str - [ '#', '209', '4.518', '52.465', '0.00', 'IJmond' ]
 * @returns Data['station']
 */
function createStationObject(str: string[]): StationData['station'] {
   const stationName = str
      .slice(5)
      .map((item: string) => item.split('\r')[0])
      .join(' ');

   return {
      name: stationName,
      code: parseInt(str[1]),
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
