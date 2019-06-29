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
      {
        test: /fonts[\/|\\].*\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: "file-loader",
        options: {
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
