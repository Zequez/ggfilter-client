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

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '/../src')
})

// let cssLoader = 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded'
let cssLoader = 'style!css?modules&importLoaders=1&localIdentName=[folder]_[local]_[hash:base64:3]!sass?outputStyle=expanded'
config.module.loaders.push({
  test: /\.s?css/,
  loader: cssLoader
})

config.module.loaders.push({
  test: /\.sass/,
  loader: cssLoader + '&indentedSyntax'
})

module.exports = config
