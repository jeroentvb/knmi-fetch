export type DailyVars = DailyVarString | DailyVarString[]

export type DailyVarString =
'DDVEC' |
'FHVEC' |
'FG' |
'FHX' |
'FHXH' |
'FHN' |
'FHNH' |
'FXX' |
'FXXH' |
'TG' |
'TN' |
'TNH' |
'TX' |
'TXH' |
'T10N' |
'T10NH' |
'SQ' |
'SP' |
'Q' |
'DR' |
'RH' |
'RHX' |
'RHXH' |
'EV24' |
'PG' |
'PX' |
'PXH' |
'PN' |
'PNH' |
'VVN' |
'VVNH' |
'VVX' |
'VVXH' |
'NG' |
'UG' |
'UX' |
'UXH' |
'UN' |
'UNH' |
'WIND'| 
'TEMP'|
'SUNR'|
'PRCP'|
'PRES'| 
'VICL'|
'MSTR'|
'ALL'

export type HourlyVars = HourlyVarString | HourlyVarString[]

export type HourlyVarString =
  'DD' |
  'FH' |
  'FF' |
  'FX' |
  'T' |
  'T10N' |
  'TD' |
  'SQ' |
  'Q' |
  'DR' |
  'RH' |
  'VV' |
  'N' |
  'U' |
  'M' |
  'R' |
  'S' |
  'O' |
  'Y' |
  'WW' |
  'WIND' |
  'TEMP' |
  'SUNR' |
  'PRCP' |
  'VICL' |
  'WEER' |
  'ALL'

export interface TimeSpan {
  start?: string
  end?: string
}