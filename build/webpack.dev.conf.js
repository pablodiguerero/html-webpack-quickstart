'use strict';

const merge = require('webpack-merge'),
  baseWebpackConfig = require('./webpack.base.conf'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
      allChunks: true
    })
  ]
});


module.exports = webpackConfig;
