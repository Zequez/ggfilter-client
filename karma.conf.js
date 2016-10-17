var webpackCfg = require('./webpack.config')

// Install karma-cli globally

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    files: [
      'test/loadtests.js'
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: ['phantomjs-shim', 'mocha', 'chai'],
    client: {
      mocha: {}
    },
    singleRun: false,
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: false,
      stats: {
        colors: true,
        chunks: false
      }
    },
    reporters: ['mocha']
    // reporters: ['mocha', 'coverage'],
    // coverageReporter: {
    //   reporters: [
    //     { type: 'text' }
    //     // { type: 'json', subdir: '.' },
    //     // { type: 'html', subdir: 'report-html' },
    //     // { type: 'lcovonly', subdir: '.' }
    //     // // reporters supporting the `file` property, use `subdir` to directly
    //     // // output them in the `dir` directory
    //     // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
    //     // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
    //     // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
    //     // { type: 'text', subdir: '.', file: 'text.txt' },
    //     // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
    //   ]
    // }
  })
}
