var path = require('path')
var webpack = require('webpack')
var port = 8001
var srcPath = path.join(__dirname, '/../src/')
var publicPath = '/assets/app/'

module.exports = {
  output: {
    path: path.join(__dirname, '/../gem/app/assets/javascripts/app'),
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
    extensions: ['.js', '.jsx', '.sass', '.scss', '.css'],
    alias: {
      shared: srcPath + 'shared/',
      images: srcPath + 'images/',
      src: srcPath,
      np: path.join(__dirname, '/node_modules')
    }
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint'
    //   }
    // ],
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=8192'
      },
      { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=8192' }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        sassLoader: {
          data: "@import 'src/shared/style/common/index';"
        }
      }
    })
  ]
}
