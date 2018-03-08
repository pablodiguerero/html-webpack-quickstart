'use strict';

const merge = require('webpack-merge'),
  baseWebpackConfig = require('./webpack.base.conf'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: { minimize: true }
          }
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[hash].min.css',
      allChunks: true
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
  ]
});

module.exports = webpackConfig;
