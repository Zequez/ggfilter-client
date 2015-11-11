var webpackCfg = require('./webpack.config');

// Install karma-cli globally

module.exports = function(config) {
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
    reporters: ['mocha'],
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    }
  });
};
