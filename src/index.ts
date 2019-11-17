import fetch, { RequestInit } from 'node-fetch'
import parser from './modules/parser'
import helper from './modules/helper'
import queryString from './modules/query-string'

import { DailyVars, TimeSpan } from './types'

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
    const res = await fetch(helper.url(), options)
    const data = await res.text()

    // TODO remove this
    const fs = require('fs')
    fs.writeFile('data-export.txt', data, (err: any) => {
      if (err) throw err
    })

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