const glob = require('glob'),
  path = require('path'),
  config = require('../config'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function toList (paths) {
  return paths.map(path => path.split('/').slice(-1)[0]);
}

function assetsPath (_path) {
  return path.posix.join(config.assetsSubDirectory, _path)
}

function getEjs () {
  return toList(glob.sync('./src/templates/*.ejs')).map(file => {
    const filename = file.split('.');
    filename.splice(-1,1);

    const options = {
      template: 'ejs-render-loader!./src/templates/' + file,
      filename: filename.join('.') + '.html'
    };

    if (Object.keys(config.excludeChunks).indexOf(filename.join('.')) !== -1) {
      options['excludeChunks'] = config.excludeChunks[filename.join('.')];
    }

    return new HtmlWebpackPlugin(options);
  })
}

module.exports = {
  entry: config.chunks,
  output: {
    path: resolve('dist'),
    filename: '[name]-[hash].js'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: config.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    ...getEjs(),
  ],
  module: {
    loaders: [
      {test: /\.(ttf|eot|woff|woff2|svg)(\?.*$|$)/, loader: "file-loader"},
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
