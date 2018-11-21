const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const publicPath = '/assets/app/';
const p = (pa) => path.join(__dirname, pa);

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  output: {
    path: p('../client-gem/app/assets/javascripts/app'),
    filename: 'app.js',
    publicPath: publicPath
  },
  entry: devMode ? [
    'webpack-dev-server/client?http://127.0.0.1:8001',
    'webpack/hot/only-dev-server',
    p('./src/run')
  ] : p('./src/run'),
  mode: process.env.NODE_ENV,
  devtool: devMode ? 'eval' : 'source-map',
  target: 'web',
  cache: devMode,
  context: __dirname,
  devServer: {
    contentBase: p('./src'),
    historyApiFallback: true,
    hot: true,
    https: false,
    port: 8001,
    publicPath: publicPath,
    noInfo: false,
    stats: {
      colors: true,
      chunks: false
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.scss', '.css'],
    alias: {
      shared: p('./src/shared/'),
      images: p('./src/images/'),
      src: p('./src/'),
      np: p('/node_modules')
    }
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', include: p('./src/') },
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.s?[ca]ss$/,
        use: [
          devMode
            ? { loader: 'style-loader' }
            : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              localIdentName: '[folder]_[local]_[hash:base64:3]',
              modules: true,
              importLoaders: 1,
              minimize: !devMode,
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
  optimization: {
    // minimizer: [new UglifyJsPlugin()],
    noEmitOnErrors: false,
    mangleWasmImports: !devMode,
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '../../stylesheets/app/app.css'}),
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
