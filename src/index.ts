import fetch, { RequestInit } from 'node-fetch'
import parse from './modules/data'
import helper from './modules/helper'
import queryString from './modules/query-string'

import { DailyVars } from './types'

export async function days (stationCode: string | number, vars?: DailyVars): Promise<{ [key: string]: string }[]> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.days(stationCode, vars)
  }

  if (vars) {
    const err = helper.checkVars.days(vars)
    if (err) throw err
  }

  try {
    const res = await fetch(helper.url(), options)
    const data = await res.text()

    const fs = require('fs')
    fs.writeFile('data-export.txt', data, (err: any) => {
      if (err) throw err
    })

    const parsedData = parse.days(data)

    // if (parsedData[0].STN != stationCode) {
    //   throw new Error('Station doesn\'t exist')
    // }

    return parsedData
  } catch (err) {
    throw err
  }
}
