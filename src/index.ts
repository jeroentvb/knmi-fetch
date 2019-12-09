import fetch, { RequestInit } from 'node-fetch'
import parser from './modules/parser'
import queryString from './modules/query-string'
import helper from './modules/helper'

import { DailyVars, TimeSpan, HourlyVars } from './types'

import { API_URL_DAYS, API_URL_HOURS } from './constants'

/**
 * Fetches and parses the daily climatology data from a station from the KNMI
 * @param stationCode: string | number
 * @param variables: string | string[]
 * @param timeSpan: { start: string, end: string }
 * @param inSeason: boolean
 * @returns Promise<{ [key: string]: string }[]>
 */
async function days (
  stationCode: string | number,
  variables?: DailyVars,
  timeSpan?: TimeSpan,
  inSeason?: boolean
): Promise<{ [key: string]: string }[]> {
  helper.checkParams(stationCode, variables, timeSpan, inSeason)

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.create(stationCode, variables, timeSpan, inSeason)
  }

  try {
    const res = await fetch(API_URL_DAYS, options)
    const data = await res.text()
    const parsedData = parser.data(data)

    if (parsedData[0].STN != stationCode) {
      throw new Error('Station doesn\'t exist')
    }

    return parsedData
  } catch (err) {
    throw err
  }
}

/**
 * Fetches and parses the hourly climatology data from a station from the KNMI
 * @param stationCode: string | number
 * @param variables: string | string[]
 * @param timeSpan: { start: string, end: string }
 * @param inSeason: boolean
 * @returns Promise<{ [key: string]: string }[]>
 */
async function hours (
  stationCode: string | number,
  variables?: HourlyVars,
  timeSpan?: TimeSpan,
  inSeason?: boolean
) {
  helper.checkParams(stationCode, variables, timeSpan, inSeason)

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.create(stationCode, variables, timeSpan, inSeason)
  }

  try {
    const res = await fetch(API_URL_HOURS, options)
    const data = await res.text()
    const parsedData = parser.data(data)

    if (parsedData[0].STN != stationCode) {
      throw new Error('Station doesn\'t exist')
    }

    return parsedData
  } catch (err) {
    throw err
  }
}

module.exports = {
  days,
  hours
}

export default {
  days,
  hours
}