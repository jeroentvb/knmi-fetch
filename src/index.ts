import fetch, { RequestInit } from 'node-fetch'
import parser from './modules/parser'
import queryString from './modules/query-string'

import { DailyVars, TimeSpan } from './types'

import { API_URL } from './constants'

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
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.days(stationCode, variables, timeSpan, inSeason)
  }

  try {
    const res = await fetch(API_URL, options)
    const data = await res.text()
    const parsedData = parser.days(data)

    if (parsedData[0].STN != stationCode) {
      throw new Error('Station doesn\'t exist')
    }

    return parsedData
  } catch (err) {
    throw err
  }
}

module.exports = {
  days
}

export default {
  days
}