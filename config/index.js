'use strict';

const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  assetsPublicPath: '/',
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'files',
  chunks: {
    application: path.resolve(__dirname, '..', 'src', 'chunks', 'index.js'),
  },
  excludeChunks: {

  }
};
