var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _ = require('lodash')

var baseConfig = require('./base')

var config = _.merge({
  entry: path.join(__dirname, '../src/run'),
  cache: false,
  devtool: 'sourcemap'
}, baseConfig)

config.plugins = config.plugins.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin('../../stylesheets/app/app.css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
])

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '/../src')
})

let cssLoader = 'css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:3]!sass?outputStyle=expanded'
config.module.loaders.push({
  test: /\.s?css$/,
  loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: cssLoader})
})

config.module.loaders.push({
  test: /\.sass$/,
  loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: cssLoader + '&indentedSyntax'})
})

module.exports = config
