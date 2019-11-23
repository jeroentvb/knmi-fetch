import { DAILYVARS } from '../constants'

import { DailyVars, DailyVarString } from '../types'

/**
 * Parse the string that contains variable names to an array of variable names.
 * @param legend
 * @returns string[]
 */
function parseLegend (legend: string): string[] {
  return legend
    .replace('# ', '')
    .split(',')
    .map((item: string) => item.trim())
}

/**
 * Check if vars is an array of strings or single string.
 * Check for if every string is a valid DailyVarsString.
 * @param vars
 * @returns void
 */
function days (vars: DailyVars): void {
  if (typeof vars === 'string') {
    checkVarsError(vars, vars)
  } else {
    vars.forEach((varString: DailyVarString) => checkVarsError(varString, vars))
  }
}

/**
 * Checks if the passed string is a valid DailyVarString, throw an error if it is not.
 * @param findVar
 * @param vars
 * @returns void
 */
function checkVarsError (findVar: DailyVarString, vars: DailyVars): void {
  const index = DAILYVARS.findIndex((key: string) => key === findVar)

  if (index === -1) {
    throw new Error(`Invalid key in VARS: ${vars}`)
  }
}

export default {
  parseLegend,
  checkVars: {
    days
  }
}
