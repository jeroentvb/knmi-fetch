/* global describe, it, expect, jest */

import data from '../dist/modules/data'

jest.mock('node-fetch')
import fetch from 'node-fetch')
const { Response } = jest.requireActual('node-fetch')

import queryString from '../dist/modules/query-string'
import parser from '../dist/modules/parser'
import helper from '../dist/modules/helper'

import mockData from './mock-data'
import constants from '../dist/constants'

describe('The data module', () => {
  it('should call the queryString.create function', async () => {
    const queryStringCreate = jest.spyOn(queryString, 'create')

    fetch.mockReturnValue(Promise.resolve(new Response(mockData.API_RESPONSE)))

    await data.get(constants.API_URL_DAYS, {
      stationCode: mockData.STATION_CODE
    })

    expect(queryStringCreate)
      .toHaveBeenCalledWith(mockData.STATION_CODE, undefined, undefined, undefined)
  })

  it('should call the parser.data function', async () => {
    const dataParser = jest.spyOn(parser, 'data')

    fetch.mockReturnValue(Promise.resolve(new Response(mockData.API_RESPONSE)))

    await data.get(constants.API_URL_DAYS, {
      stationCode: mockData.STATION_CODE
    })

    expect(dataParser)
      .toHaveBeenCalledWith(mockData.API_RESPONSE, mockData.STATION_CODE)
  })

  it('should call the helper.checkStationExists function', async () => {
    const checkStationExists = jest.spyOn(helper, 'checkStationExists')

    fetch.mockReturnValue(Promise.resolve(new Response(mockData.API_RESPONSE)))

    await data.get(constants.API_URL_DAYS, {
      stationCode: mockData.STATION_CODE
    })

    expect(checkStationExists)
      .toHaveBeenCalledWith(mockData.PARSED_API_RESPONSE, mockData.STATION_CODE)
  })
})
