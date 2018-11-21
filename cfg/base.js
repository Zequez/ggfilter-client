var path = require('path')
var webpack = require('webpack')
var srcPath = path.join(__dirname, '/../src/')
var publicPath = '/assets/app/'

module.exports = {
  output: {
    path: path.join(__dirname, '/../gem/app/assets/javascripts/app'),
    filename: 'app.js',
    publicPath: publicPath
  },
  target: 'web',
  context: __dirname,
  devServer: {
    contentBase: path.join(__dirname, '/../src'),
    historyApiFallback: true,
    hot: true,
    https: false,
    port: 8001,
    publicPath: publicPath,
    noInfo: false,
    // stats: {
    //   colors: true,
    //   chunks: false
    // }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.scss', '.css'],
    alias: {
      shared: srcPath + 'shared/',
      images: srcPath + 'images/',
      src: srcPath,
      np: path.join(__dirname, '/node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '/../src')
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.s?[ca]ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              localIdentName: '[folder]_[local]_[hash:base64:3]',
              modules: true,
              importLoaders: 1,
              minimize: false,
              namedExport: true,
              camelCase: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              indentedSyntax: true,
              data: "@import 'src/shared/style/common/index';"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /sass\.d\.ts$/,
      /scss\.d\.ts$/,
      /css\.d\.ts$/,
    ]),
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
