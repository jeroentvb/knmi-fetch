import fetch, { RequestInit } from 'node-fetch'

import queryString from './query-string'
import parser from './parser'

import { HourlyVars, DailyVars, TimeSpan } from '../types'

async function get (
  url: string,
  stationCode: string | number,
  variables?: DailyVars | HourlyVars,
  timeSpan?: TimeSpan,
  inSeason?: boolean
) {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.create(stationCode, variables, timeSpan, inSeason)
  }

  try {
    const res = await fetch(url, options)
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

export default {
  get
}
