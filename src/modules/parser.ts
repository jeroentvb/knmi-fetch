import helper from './helper'

function days (data: string): { [key: string]: string }[] {
  let legend: string[]
  return data
  // Split string at newline characters
  .split('\n')
  // Remove all comments from the data.
  // If the legend was found, put it in the legend var
  .filter((row: string) => {
    if (row.includes('# STN,YYYYMMDD')) {
      legend = helper.parseLegend(row)
    }
    
    return !row.includes('#')
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
}

export default {
  days
}
