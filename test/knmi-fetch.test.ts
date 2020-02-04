/* global describe, it, expect, jest */

const knmiFetch = require('../dist/knmi-fetch')
const helper = require('../dist/modules/helper').default

const data = require('../dist/modules/data').default
jest.mock('../dist/modules/data.js')

const mockData = require('./mock-data')
const constants = require('../dist/constants')

describe('The knmi fetch module', () => {
  it('the days function should call checkParams', () => {
    const checkParams = jest.spyOn(helper, 'checkParams')

    knmiFetch.days(mockData.STATION_CODE)

    expect(checkParams).toHaveBeenCalledWith({
      stationCode: mockData.STATION_CODE
    }, constants.DAILY)
  })

  it('the days function should call data.get', () => {
    knmiFetch.days(mockData.STATION_CODE)

    expect(data.get).toHaveBeenCalledWith(constants.API_URL_DAYS, {
      stationCode: mockData.STATION_CODE
    })
  })

  it('the hours function should call checkParams', () => {
    const checkParams = jest.spyOn(helper, 'checkParams')

    knmiFetch.hours(mockData.STATION_CODE)

    expect(checkParams).toHaveBeenCalledWith({
      stationCode: mockData.STATION_CODE
    }, constants.DAILY)
  })

  it('the hours function should call data.get', () => {
    knmiFetch.hours(mockData.STATION_CODE)

    expect(data.get).toHaveBeenCalledWith(constants.API_URL_HOURS, {
      stationCode: mockData.STATION_CODE
    })
  })
})
