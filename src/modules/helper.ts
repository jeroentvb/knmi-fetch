import typeCheck from './check-types'
import { DAILY, HOURLY, DAILYVARS, HOURLYVARS } from '../constants'

function checkParams(
  stationCode: any,
  variableType: 'daily' | 'hourly',
  variables?: any,
  timeSpan?: any,
  inSeason?: any
): void {
  typeCheck.stationCode(stationCode)
  if (variables && variableType === DAILY) typeCheck.vars(variables, DAILYVARS)
  if (variables && variableType === HOURLY) typeCheck.vars(variables, HOURLYVARS)
  if (timeSpan) typeCheck.timeSpan(timeSpan)
  if (inSeason) typeCheck.inSeason(inSeason, timeSpan)
}

async function getData() {

}

export default {
  checkParams
}
