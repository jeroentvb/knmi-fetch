import helper from './helper'

import { DailyVars, TimeSpan } from "../types"
import { BodyInit } from "node-fetch"

function days (stationCode: string | number, vars?: DailyVars, timeSpan?: TimeSpan): BodyInit {
  const params = {
    vars: '',
    timeSpan: '' //'byear=2018&bmonth=1&bday=1&eyear=2019&emonth=8&eday=18'
  }

  if (vars) {
    const err = helper.checkVars.days(vars)
    if (err) throw err
  }

  if (!vars) {
    params.vars = 'ALL'
  } else if (typeof vars === 'string') {
    params.vars = vars
  } else if (Array.isArray(vars)) {
    params.vars = vars.join(':')
  }

  if (timeSpan && timeSpan.start) {
    if (timeSpan.start.length === 8) {
      params.timeSpan += `&start=${timeSpan.start}`
    } else {
      throw new Error('timeSpan.start does not contain 8 characters')
    }
  }

  if (timeSpan && timeSpan.end) {
    if (timeSpan.end.length === 8) {
      params.timeSpan += `&end=${timeSpan.end}`
    } else {
      throw new Error('timeSpan.end does not contain 8 characters')
    }
  }

  return `stns=${stationCode}&vars=${params.vars}${params.timeSpan}`
}

export default {
  days
}
