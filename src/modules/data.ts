import { dataObj } from '../interfaces'

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

export default function (data: string): dataObj[] {
  return data
  // Split string at newline characters
  .split('\n')
  // Remove all comments from the data
  .filter((row: string) => !row.includes('#'))
  // Create an array from the data string and remove spaces
  .map((row: string) => {
    return row
      .split(',')
      .map((item: string) => item.trim())
  })
  // Return the array of values as a usable object
  .map((value: string[]) => {
    return {
      STN: value[0],
      YYYYMMDDD: value[1],
      DDVEC: value[2],
      FHVEC: value[3],
      F6: value[4],
      FHX: value[5],
      FHXH: value[6],
      FHN: value[7],
      FHNH: value[8],
      FXX: value[9],
      FXXH:value[10]
    }
  })
}
