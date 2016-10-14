var path = require('path')
var srcPath = path.join(__dirname, '/../src/')

module.exports = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
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
    ],
    noParse: [
      /node_modules\/sinon\//
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee'],
    alias: {
      shared: srcPath + 'shared/',
      actions: srcPath + 'actions/',
      helpers: path.join(__dirname, '/../test/helpers'),
      components: srcPath + 'components/',
      sources: srcPath + 'sources/',
      stores: srcPath + 'stores/',
      styles: srcPath + 'styles/',
      images: srcPath + '/images/',
      lib: srcPath + '/lib/',
      src: srcPath + '/',
      compass: 'compass-mixins/lib/compass',
      sinon: 'sinon/pkg/sinon'
    }
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  }
}
