import { RequestInfo } from "node-fetch"

import { DAILYVARS } from '../constants'

import { DailyVars } from '../types'

function url (): RequestInfo {
  return 'http://projects.knmi.nl/klimatologie/daggegevens/getdata_dag.cgi'
}

function parseLegend (legend: string): string[] {
  return legend
    .replace('# ', '')
    .split(',')
    .map((item: string) => item.trim())
}

function days (vars: DailyVars): Error | void {
  if (typeof vars === 'string') {
    const index = DAILYVARS.findIndex((key: string) => key === vars)

    if (index === -1) {
      return new Error(`Invalid key in VARS: ${vars}`)
    }
  } else {
    vars.forEach((varString: string) => {
      const index = DAILYVARS.findIndex((key: string) => key === varString)

      if (index === -1) {
        return new Error(`Invalid key in VARS: ${varString}`)
      }
    })
  }
}

export default {
  url,
  parseLegend,
  checkVars: {
    days
  }
}
