/* global describe, it, expect */

const queryString = require('../dist/modules/query-string').default;

const mockData = require('./mock-data');

describe('The query string module', () => {
   it('should return a query string with the correct stations', () => {
      expect(
         queryString.create([mockData.STATION_CODE, mockData.STATION_CODE])
      ).toEqual('stns=260:260&vars=ALL');
   });

   it('should return a query string with the corerct variables', () => {
      expect(
         queryString.create(mockData.STATION_CODE)
      ).toEqual('stns=260&vars=ALL');

      expect(
         queryString.create(mockData.STATION_CODE, 'WIND')
      ).toEqual('stns=260&vars=WIND');

      expect(
         queryString.create(mockData.STATION_CODE, ['WIND', 'TEMP'])
      ).toEqual('stns=260&vars=WIND:TEMP');
   });

   it('should return a query string with the correct time span', () => {
      expect(
         queryString.create(mockData.STATION_CODE, 'ALL', mockData.TIME_SPAN)
      ).toEqual('stns=260&vars=ALL&start=20190114&end=20190116');
   });

   it('should return a query string with inseason=Y', () => {
      expect(
         queryString.create(mockData.STATION_CODE, 'ALL', mockData.TIME_SPAN, true)
      ).toEqual('stns=260&vars=ALL&start=20190114&end=20190116&inseason=Y');
   });
});
