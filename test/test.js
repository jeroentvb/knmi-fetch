const knmi = require('../dist/index')
const helper = require('jeroentvb-helper')

knmi.get(process.argv[2] || 249)
  .then(res => {
    helper.exportToFile('data', res)
    // console.log(res)
  })
  .catch(err => console.error(err))
