var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./base');

var config = _.merge({
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8001',
    'webpack/hot/only-dev-server',
    './src/run'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '/../src')
});

config.module.loaders.push({
  test: /\.css$/,
  loader: 'style!css'
});

config.module.loaders.push({
  test: /\.s[ac]ss/,
  loader: 'style!css!sass?outputStyle=expanded&indentedSyntax'
});

module.exports = config;
