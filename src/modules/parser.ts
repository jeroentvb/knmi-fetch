import { StationData } from '../types'

/**
 * Takes the knmi station data (txt) and parses it to usable json
 * @param data string
 * @returns object[]
 */
function data (data: string, stationCode: string | number): StationData {
  let legend: string[]
  let stationInfo: StationData['station']

  const dataArray: StationData['data'] = data
    // Split string at newline characters
    .split('\n')
    // Remove all comments from the data.
    // Get the legend and station info
    .filter((row: string) => {
      // Get the legend
      if (row.includes('# STN,YYYYMMDD')) {
        legend = parseLegend(row)
      }

      // Get the station info
      if (row.includes('#') && row.includes(stationCode as string)) {
        const stationString = row.split(' ').filter(item => item)

        stationInfo = createStationObject(stationString, stationCode)
      }
      
      return !row.includes('#') && row !== ''
    })
    // Create an array from the data string and remove spaces
    .map((row: string) => {
      return row
        .split(',')
        .map((item: string) => item.trim())
    })
    // Return the array of values as a usable object
    .map((values: string[]) => {
      const data: { [key: string]: string } = {}

      legend.forEach((item: string, i: number) => {
        data[item] = values[i]
      })

      return data
    })

    return {
      station: stationInfo!,
      data: dataArray
    }
}

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
 * Return a station info object
 * @param str 
 * @param stationCode
 * @returns Data['station']
 */
function createStationObject (str: string[], stationCode: string | number): StationData['station'] {
  return {
    name: str[str.length - 1].split('\r')[0],
    code: stationCode,
    coordinates: {
      lat: parseFloat(str[str.length - 3]),
      lng: parseFloat(str[str.length - 4]),
    },
    altitude: parseFloat(str[str.length - 2])
  }
}

export default {
  data
}
