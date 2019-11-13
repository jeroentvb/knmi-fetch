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

export function parse (data: string) {
  return data
  .split('\n')
  .filter((row, i) => i > 19)
  .map(row => row.split(',')
  .map(item => item.trim()))
  .map(date => {
    const obj: {
      [key: string]: string
    } = {}

    date.forEach((item: string, i: number) => {
      obj[keys[i]] = item
    })

    return obj
  })
}
