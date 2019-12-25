/* global describe, it, expect, jest */

const helper = require('../dist/modules/helper').default
const typeCheck = require('../dist/modules/check-types').default

const mockData = require('./mock-data')
const constants = require('../dist/constants')

describe('The helper module', () => {
  it('should check the params and return no error', () => {
    const stationCode = jest.spyOn(typeCheck, 'stationCode')
    const variables = jest.spyOn(typeCheck, 'vars')
    const timeSpan = jest.spyOn(typeCheck, 'timeSpan')
    const inSeason = jest.spyOn(typeCheck, 'inSeason')

    helper.checkParams({
      stationCode: mockData.STATION_CODE,
      variables: mockData.VARIABLES,
      timeSpan: mockData.TIME_SPAN,
      inSeason: mockData.INSEASON
    }, constants.DAILY)

    expect(stationCode).toHaveBeenCalledWith(mockData.STATION_CODE)
    expect(variables).toHaveBeenCalledWith(mockData.VARIABLES, constants.DAILYVARS)
    expect(timeSpan).toHaveBeenCalledWith(mockData.TIME_SPAN)
    expect(inSeason).toHaveBeenCalledWith(mockData.INSEASON, mockData.TIME_SPAN)
  })

  it('should call typeCheck.vars with the HOURLYVARS', () => {
    const variables = jest.spyOn(typeCheck, 'vars')

    helper.checkParams({
      stationCode: mockData.STATION_CODE,
      variables: mockData.VARIABLES
    }, constants.HOURLY)

    expect(variables)
      .toHaveBeenCalledWith(mockData.VARIABLES, constants.HOURLYVARS)
  })
})
