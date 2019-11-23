import helper from './helper'

import { DailyVars, TimeSpan } from "../types"
import { BodyInit } from "node-fetch"

/**
 * Pass in all the parameters and return the query as a string.
 * @param stationCode string or number
 * @param variables string | string []
 * @param timeSpan { start: string, end: string }
 * @param inSeason boolean
 * @returns string
 */
function days (
    stationCode: string | number,
    variables?: DailyVars,
    timeSpan?: TimeSpan,
    inSeason?: boolean
  ): BodyInit {
  const params = {
    vars: parseVars(variables),
    timeSpan: parseTimeSpan(timeSpan),
    inSeason: setInseason(inSeason, timeSpan)
  }

  return `stns=${stationCode}&vars=${params.vars}${params.timeSpan}${params.inSeason}`
}

/**
 * Parse the vars to usable params.
 * Returns 'ALL' if there are no vars.
 * Joins the array of vars, or returns the vars variable.
 * @param vars 
 * @returns string
 */
function parseVars (vars: DailyVars | undefined): string {
  if (vars) helper.checkVars.days(vars)

  if (!vars) return 'ALL'

  return Array.isArray(vars) ? vars.join(':') : vars

}

/**
 * Checks if the timeSpan was passed in and returns a string.
 * @param timeSpan { start: string, end: string }
 * @returns string
 */
function parseTimeSpan (timeSpan?: TimeSpan): string {
  let timeSpanStr = ''

  if (timeSpan && timeSpan.start) {
    timeSpanStr += `&start=${checkTimeSpan(timeSpan.start)}`
  }

  if (timeSpan && timeSpan.end) {
    timeSpanStr += `&end=${checkTimeSpan(timeSpan.end)}`
  }

  return timeSpanStr
}

/**
 * Check if the passed in timeSpan is valid, throws an error if not.
 * @param timeSpan: { start: string, end: string }
 * @returns string
 */
function checkTimeSpan(timeSpan: string): string {
  if (timeSpan.length === 8) {
    return timeSpan
  } else {
    throw new Error(`timeSpan ${timeSpan} does not contain 8 characters`)
  }
}

/**
 * Checks if inSeason is set to true and if there is a timeSpan.
 * @param inSeason boolean
 * @param timeSpan { start: string, end: string }
 * @returns string | void
 */
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
