import typeCheck from './check-types'

function checkParams(
  stationCode: any,
  variables?: any,
  timeSpan?: any,
  inSeason?: any
): void {
  typeCheck.stationCode(stationCode)
  if (variables) typeCheck.dailyVars(variables)
  if (timeSpan) typeCheck.timeSpan(timeSpan)
  if (inSeason) typeCheck.inSeason(inSeason, timeSpan)
}

export default {
  checkParams
}
