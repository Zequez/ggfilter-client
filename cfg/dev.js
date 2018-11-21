var path = require('path')
var webpack = require('webpack')
var _ = require('lodash')
var CircularDependencyPlugin = require('circular-dependency-plugin')

var baseConfig = require('./base')

var config = _.merge({
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8001',
    'webpack/hot/only-dev-server',
    './src/run'
  ],
  entry: path.join(__dirname, '/../src/run'),
  cache: true,
  devtool: '#eval'
}, baseConfig)

config.plugins = config.plugins.concat([
  // new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin(),
  // new CircularDependencyPlugin({
  //   // exclude detection of files based on a RegExp
  //   exclude: /node_modules/
  //   // add errors to webpack instead of warnings
  //   // failOnError: true
  // }),
  // new webpack.NamedModulesPlugin()
])

// let cssLoader = 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded'
// let cssLoader = 'style-loader!typings-for-css-modules-loader?-minimize&namedExport&camelCase&modules&importLoaders=1&localIdentName=[folder]_[local]_[hash:base64:3]'
// config.module.rules = config.module.rules.concat([

//   // {
//   //   test: /\.scss/,
//   //   loader: cssLoader + '!sass-loader?outputStyle=expanded',
//   //   options: { data: "@import 'src/shared/style/common/index';" }
//   // },
//   // {
//   //   test: /\.sass/,
//   //   loader: cssLoader + '!sass-loader?outputStyle=expanded&indentedSyntax',
//   //   options: { data: "@import 'src/shared/style/common/index';" }
//   // },
// ])

module.exports = config
