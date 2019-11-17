import helper from './helper'

import { DailyVars } from "../types"
import { BodyInit } from "node-fetch"

function days (stationCode: string | number, vars?: DailyVars): BodyInit {
  const params = {
    vars: '',
    timeSpan: 'byear=2018&bmonth=1&bday=1&eyear=2019&emonth=8&eday=18'
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

  return `stns=${stationCode}&vars=${params.vars}&${params.timeSpan}`
}

export default {
  days
}
