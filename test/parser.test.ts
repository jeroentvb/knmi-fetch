/* global describe, it, expect */

const parser = require('../dist/modules/parser').default

const mockData = require('./mock-data')

describe('The parser module', () => {
  it('should parse the daily data', () => {
    const parsedData = parser.data(mockData.API_RESPONSE, mockData.STATION_CODE)

    expect(parsedData).toEqual(mockData.PARSED_API_RESPONSE)
  })

  it('it should parse the hourly data', () => {
    const parsedData = parser.data(mockData.API_RESPONSE_HOURS, [mockData.STATION_CODE, 260])

    expect(parsedData).toEqual(mockData.PARSED_API_RESPONSE_HOURS)
  })
})
