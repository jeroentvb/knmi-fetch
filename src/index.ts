import fetch, { RequestInit, RequestInfo } from 'node-fetch'
import parse from './modules/data'

import { dataObj } from './interfaces'

const url: RequestInfo = 'http://projects.knmi.nl/klimatologie/daggegevens/getdata_dag.cgi'

export async function get (stationCode: string | number): Promise<dataObj[] | Error> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `stns=${stationCode}&vars=WIND&byear=2018&bmonth=1&bday=1&eyear=2019&emonth=8&eday=18`
  }

  try {
    const res = await fetch(url, options)
    const data = await res.text()
    const parsedData = parse(data)

    if (parsedData[0].STN != stationCode) {
      throw new Error('Station doesn\'t exist')
    }

    return parsedData
  } catch (err) {
    throw err
  }
}
