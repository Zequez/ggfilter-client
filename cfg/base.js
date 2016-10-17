var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var port = 8001;
var srcPath = path.join(__dirname, '/../src/');
var publicPath = '/assets/';

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../gem/app/assets/javascripts'),
    filename: 'app.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false,
    stats: {
      colors: true,
      chunks: false
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.sass', '.scss'],
    alias: {
      shared: srcPath + 'shared/',
      images: srcPath + 'images/',
      src: srcPath
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url?limit=8192'
      },
      { test: /\.coffee$/, loader: 'babel!coffee' },
      { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=8192' }
    ]
  }
};
