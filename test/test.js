const knmi = require('../dist/index')
const helper = require('jeroentvb-helper')

knmi.days(process.argv[2] || 249, 'WIND', {
  start: '20191101',
  end: '20191110'
})
  .then(res => {
    helper.exportToFile('data', res)
    // console.log(res)
  })
  .catch(err => console.error(err))
