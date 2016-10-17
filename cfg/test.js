var path = require('path')
var srcPath = path.join(__dirname, '/../src/')

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ]
      },
      { test: /\.coffee$/, loader: 'babel!coffee' }
      // {
      //   test: /\.js$/,
      //   exclude: /\.spec\.js$/,
      //   include: path.join(__dirname, '/../src'),
      //   loader: 'istanbul-instrumenter',
      //   enforce: 'post'
      // }
    ],
    noParse: [
      /node_modules\/sinon\//
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.coffee'],
    alias: {
      shared: srcPath + 'shared/',
      images: srcPath + 'images/',
      src: srcPath,
      helpers: path.join(__dirname, '/../test/helpers'),
      sinon: 'sinon/pkg/sinon'
    }
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  node: {
    fs: 'empty'
  }
}
