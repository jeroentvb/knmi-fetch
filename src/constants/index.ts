import { DailyVarString, HourlyVarString } from '../types/index.js';

export const API_URL_DAYS = 'http://projects.knmi.nl/klimatologie/daggegevens/getdata_dag.cgi';

export const API_URL_HOURS = 'http://projects.knmi.nl/klimatologie/uurgegevens/getdata_uur.cgi';

export const DAILY = 'daily';
export const HOURLY = 'hourly';

export const DAILYVARS: DailyVarString[] = [
   'DDVEC',
   'FHVEC',
   'FG',
   'FHX',
   'FHXH',
   'FHN',
   'FHNH',
   'FXX',
   'FXXH',
   'TG',
   'TN',
   'TNH',
   'TX',
   'TXH',
   'T10N',
   'T10NH',
   'SQ',
   'SP',
   'Q',
   'DR',
   'RH',
   'RHX',
   'RHXH',
   'EV24',
   'PG',
   'PX',
   'PXH',
   'PN',
   'PNH',
   'VVN',
   'VVNH',
   'VVX',
   'VVXH',
   'NG',
   'UG',
   'UX',
   'UXH',
   'UN',
   'UNH',
   'WIND',
   'TEMP',
   'SUNR',
   'PRCP',
   'PRES',
   'VICL',
   'MSTR',
   'ALL'
];

export const HOURLYVARS: HourlyVarString[] = [
   'DD',
   'FH',
   'FF',
   'FX',
   'T',
   'T10N',
   'TD',
   'SQ',
   'Q',
   'DR',
   'RH',
   'VV',
   'N',
   'U',
   'M',
   'R',
   'S',
   'O',
   'Y',
   'WW',
   'WIND',
   'TEMP',
   'SUNR',
   'PRCP',
   'VICL',
   'WEER',
   'ALL'
];
