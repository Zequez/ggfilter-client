var path = require('path')
var webpack = require('webpack')
var _ = require('lodash')
var CircularDependencyPlugin = require('circular-dependency-plugin')

var baseConfig = require('./base')

var config = _.merge({
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8001',
    'webpack/hot/only-dev-server',
    './src/run'
  ],
  cache: true,
  devtool: '#eval'
}, baseConfig)

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /node_modules/
    // add errors to webpack instead of warnings
    // failOnError: true
  }),
  new webpack.NamedModulesPlugin()
])

// let cssLoader = 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded'
let cssLoader = 'style!typings-for-css-modules-loader?namedExport&camelCase&modules&importLoaders=1&localIdentName=[folder]_[local]_[hash:base64:3]'
config.module.loaders.push({
  test: /\.css/,
  loader: cssLoader
})

config.module.loaders.push({
  test: /\.scss/,
  loader: cssLoader + '!sass?outputStyle=expanded'
})

config.module.loaders.push({
  test: /\.sass/,
  loader: cssLoader + '!sass?outputStyle=expanded&indentedSyntax'
})

module.exports = config
