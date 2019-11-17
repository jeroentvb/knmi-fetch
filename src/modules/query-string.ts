import helper from './helper'

import { DailyVars, TimeSpan } from "../types"
import { BodyInit } from "node-fetch"

function days (
    stationCode: string | number,
    variables?: DailyVars,
    timeSpan?: TimeSpan,
    inSeason?: boolean
  ): BodyInit {
  const params = {
    vars: parseVars(variables),
    timeSpan: parseTimeSpan(timeSpan), //'byear=2018&bmonth=1&bday=1&eyear=2019&emonth=8&eday=18'
    inSeason: setInseason(inSeason, timeSpan)
  }

  return `stns=${stationCode}&vars=${params.vars}${params.timeSpan}${params.inSeason}`
}

function parseVars (vars: DailyVars | undefined) {
  if (vars) {
    const err = helper.checkVars.days(vars)
    if (err) throw err
  }

  if (!vars) {
    return 'ALL'
  } else if (typeof vars === 'string') {
    return vars
  } else if (Array.isArray(vars)) {
    return vars.join(':')
  }
}

function parseTimeSpan (timeSpan: TimeSpan | undefined): string {
  let timeSpanStr = ''

  if (timeSpan && timeSpan.start) {
    if (timeSpan.start.length === 8) {
      timeSpanStr += `&start=${timeSpan.start}`
    } else {
      throw new Error('timeSpan.start does not contain 8 characters')
    }
  }

  if (timeSpan && timeSpan.end) {
    if (timeSpan.end.length === 8) {
      timeSpanStr += `&end=${timeSpan.end}`
    } else {
      throw new Error('timeSpan.end does not contain 8 characters')
    }
  }

  return timeSpanStr
}

function setInseason (inSeason?: boolean, timeSpan?: TimeSpan): string | void {
  if (inSeason) {
    if (timeSpan && timeSpan.start && timeSpan.end) {
      return '&inseason=Y'
    } else {
      throw new Error('Missing start or end date. Otherwise "inSeason" won\'t work')
    }
  }
}

export default {
  days
}
