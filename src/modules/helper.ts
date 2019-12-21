import typeCheck from './check-types'
import { DAILY, HOURLY, DAILYVARS, HOURLYVARS } from '../constants'

/**
 * Check if the params are in the correct format
 * @param params 
 * @param variableType
 */
function checkParams(
  params: {
    stationCode: any,
    variables?: any,
    timeSpan?: any,
    inSeason?: any
  },
  variableType: 'daily' | 'hourly',
): void {
  typeCheck.stationCode(params.stationCode)
  if (params.variables && variableType === DAILY) typeCheck.vars(params.variables, DAILYVARS)
  if (params.variables && variableType === HOURLY) typeCheck.vars(params.variables, HOURLYVARS)
  if (params.timeSpan) typeCheck.timeSpan(params.timeSpan)
  if (params.inSeason) typeCheck.inSeason(params.inSeason, params.timeSpan)
}

export default {
  checkParams
}
