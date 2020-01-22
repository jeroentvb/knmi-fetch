const knmi = require('../dist/knmi-fetch')
const helper = require('jeroentvb-helper')

function testDays () {
  knmi.days(process.argv[2] || [249, 260], 'ALL', {
    start: '19990114',
    end: '20190115'
  }, true)
    .then(res => {
      helper.export.json('data', res)
      // console.log(res)
    })
    .catch(err => console.error(err))
}

function testHours () {
  knmi.hours(process.argv[2] || [249, 260], 'WIND', {
    start: '2019011401',
    end: '2019011601'
  }, true)
    .then(res => {
      // console.log(res)
      helper.export.json('data', res)
    })
    .catch(err => console.error(err))
}

// testDays()
testHours()
