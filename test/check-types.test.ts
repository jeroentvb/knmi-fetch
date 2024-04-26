/* global describe, it, expect */

import typeCheck from '../dist/modules/check-types';

import mockData from './mock-data';
import constants from '../dist/constants';

describe('The check-types module', () => {
   it('stationCode function should not throw', () => {
      expect(() => {
         typeCheck.stationCode(mockData.STATION_CODE);
         typeCheck.stationCode(mockData.STATION_CODE.toString());
         typeCheck.stationCode([mockData.STATION_CODE, mockData.STATION_CODE]);
         typeCheck.stationCode([mockData.STATION_CODE.toString(), mockData.STATION_CODE.toString()]);
      }).not.toThrow();
   });

   it('stationCode function should throw', () => {
      expect(() => {
         typeCheck.stationCode({ stationCode: 243 });
      }).toThrow();

      expect(() => {
         typeCheck.stationCode([true, false]);
      }).toThrow();
   });

   it('vars function should not throw', () => {
      expect(() => {
         typeCheck.vars(mockData.VARIABLES, constants.DAILYVARS);
         typeCheck.vars(mockData.VARIABLES, constants.HOURLYVARS);
         typeCheck.vars(['WIND', 'TEMP'], constants.HOURLYVARS);
      }).not.toThrow();
   });

   it('vars function should throw', () => {
      expect(() => {
         typeCheck.vars('WRONG!', constants.DAILYVARS);
      }).toThrow();

      expect(() => {
         typeCheck.vars(234, constants.DAILYVARS);
      }).toThrow();

      expect(() => {
         typeCheck.vars(['23', 345], constants.DAILYVARS);
      }).toThrow();
   });

   it('timeSpan function should not throw', () => {
      expect(() => {
         typeCheck.timeSpan(mockData.TIME_SPAN);
      }).not.toThrow();
   });

   it('timeSpan function should throw', () => {
      expect(() => {
         typeCheck.timeSpan({
            start: 20191219
         });
      }).toThrow();

      expect(() => {
         typeCheck.timeSpan({
            start: 201912190
         });
      }).toThrow();
   });

   it('inSeason function should not throw', () => {
      expect(() => {
         typeCheck.inSeason(mockData.INSEASON, mockData.TIME_SPAN);
      }).not.toThrow();
   });

   it('inSeason function should throw', () => {
      expect(() => {
         typeCheck.inSeason(mockData.INSEASON);
      }).toThrow();

      expect(() => {
         typeCheck.inSeason('true');
      }).toThrow();
   });
});
