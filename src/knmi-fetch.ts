import data from './modules/data'
import helper from './modules/helper'

import { API_URL_DAYS, API_URL_HOURS, HOURLY, DAILY } from './constants'

import { DailyVars, TimeSpan, HourlyVars } from './types'

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
  helper.checkParams({
    stationCode,
    variables,
    timeSpan,
    inSeason
  }, DAILY)

  try {
    const knmiData = await data
      .get(API_URL_DAYS, {
        stationCode,
        variables,
        timeSpan,
        inSeason
      })

    return knmiData
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
  helper.checkParams({
    stationCode,
    variables,
    timeSpan,
    inSeason
  }, HOURLY)

  try {
    const knmiData = await data
      .get(API_URL_HOURS, {
        stationCode,
        variables,
        timeSpan,
        inSeason
      })

    return knmiData
  } catch (err) {
    throw err
  }
}

export {
  days,
  hours
}
