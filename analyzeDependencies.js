// var config = require('./webpack.config')
const madge = require('madge')

;['FilterApp', 'LightBox', 'SavedFiltersManager', 'SysreqCalc'].forEach(function (mod) {
  madge('src/' + mod, {webpackConfig: 'webpack.config.js'})
    // .then((res) => {
    //   console.log(res.depends())
    // })
    .then((res) => res.image('dependenciesGraphs/' + mod + '.svg'))
    .then((writtenImagePath) => {
      console.log('Image written to ' + writtenImagePath)
    })
})
