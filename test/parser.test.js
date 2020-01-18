/* global describe, it, expect */

const parser = require('../dist/modules/parser').default

const mockData = require('./mock-data')

describe('The parser module', () => {
  it('should parse the data', () => {
    const parserData = parser.data(mockData.API_RESPONSE, mockData.STATION_CODE)

    expect(parserData).toEqual(mockData.PARSED_API_RESPONSE)
  })
})
