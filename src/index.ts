import fetch, { RequestInit, RequestInfo } from 'node-fetch'
import * as data from './modules/data'
import fs from 'fs'
const helper = require('jeroentvb-helper')

const url: RequestInfo = 'http://projects.knmi.nl/klimatologie/daggegevens/getdata_dag.cgi'
const options: RequestInit = {
  method: 'POST',
  headers: {
    // 'Accept': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'stns=249&vars=WIND&byear=2018&bmonth=1&bday=1&eyear=2019&emonth=8&eday=18'
}

const keys = [
  'STN',
  'YYYYMMDD',
  'DDVEC',
  'FHVEC',
  'FG',
  'FHX',
  'FHXH',
  'FHN',
  'FHNH',
  'FXX',
  'FXXH'
]

async function init() {
  try {
    // const res = await fetch(url, options)
    // const data = await res.text()
    const rawData = fs.readFileSync(__dirname.replace('dist', 'data-export.txt'), 'utf8')

    const parsed = data.parse(rawData)
    console.log(parsed)


    helper.exportToFile('data', parsed)
  } catch (err) {
    console.error(err)
  }
}

init()
