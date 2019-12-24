const knmi = require('../dist/knmi-fetch')
const helper = require('jeroentvb-helper')

function testDays () {
  knmi.days(process.argv[2] || 249, 'WIND', {
    start: '19990114',
    end: '20190115'
  }, true)
    .then(res => {
      helper.exportToFile('data', res)
      // console.log(res)
    })
    .catch(err => console.error(err))
}

function testHours () {
  knmi.hours(process.argv[2] || 249, 'WIND', {
    start: '2019011401',
    end: '2019011601'
  }, true)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

// testDays()
// testHours()

describe('testing', () => {
  it('should do stuff', () => {
    expect(true).toEqual(true)
  })
})
