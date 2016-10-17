var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _ = require('lodash')

var baseConfig = require('./base')

var config = _.merge({
  entry: path.join(__dirname, '../src/run'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('../stylesheets/app.css')
  ]
}, baseConfig)

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '/../src')
})

config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: 'css?sourceMap'})
})

config.module.loaders.push({
  test: /\.s[ac]ss$/,
  loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: 'css?sourceMap!sass-loader?outputStyle=expanded&indentedSyntax'})
})

module.exports = config
