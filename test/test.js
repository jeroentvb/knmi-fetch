const knmi = require('../dist/index')
const helper = require('jeroentvb-helper')

knmi.days(process.argv[2] || 249, 'WIND', {
  start: '19990114',
  end: '20190114'
}, true)
  .then(res => {
    helper.exportToFile('data', res)
    // console.log(res)
  })
  .catch(err => console.error(err))
