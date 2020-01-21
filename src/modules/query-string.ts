import { DailyVars, TimeSpan, HourlyVars, StationCode } from '../types'
import { BodyInit } from 'node-fetch'

/**
 * Pass in all the parameters and return the query as a string.
 * @param stationCode string or number
 * @param variables string | string []
 * @param timeSpan { start: string, end: string }
 * @param inSeason boolean
 * @returns string
 */
function create (
    stationCode: StationCode,
    variables?: DailyVars | HourlyVars,
    timeSpan?: TimeSpan,
    inSeason?: boolean
  ): BodyInit {
  const params = {
    stationCode: parseStationCode(stationCode),
    vars: parseVars(variables),
    timeSpan: parseTimeSpan(timeSpan),
    inSeason: setInseason(inSeason)
  }

  return `stns=${params.stationCode}&vars=${params.vars}${params.timeSpan}${params.inSeason}`
}

function parseStationCode(stationCode: StationCode): string | number {
  if (Array.isArray(stationCode)) {
    return stationCode.join(':')
  }

  return stationCode
}

/**
 * Parse the vars to usable params.
 * Returns 'ALL' if there are no vars.
 * Joins the array of vars, or returns the vars variable.
 * @param vars 
 * @returns string
 */
function parseVars (vars: DailyVars | HourlyVars | undefined): string {
  if (!vars) return 'ALL'

  return Array.isArray(vars) ? vars.join(':') : vars
}

/**
 * Checks if the timeSpan was passed in and returns a string.
 * @param timeSpan { start: string, end: string }
 * @returns string
 */
function parseTimeSpan (timeSpan?: TimeSpan): string {
  if (timeSpan) {
    return `&start=${timeSpan.start}&end=${timeSpan.end}`
  }

  return ''
}

/**
 * Checks if inSeason is set to true and if there is a timeSpan.
 * @param inSeason boolean
 * @param timeSpan { start: string, end: string }
 * @returns string
 */
function setInseason (inSeason?: boolean): string {
  if (inSeason) {
    return '&inseason=Y'
  }

  return ''
}

export default {
  create
}
