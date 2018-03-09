'use strict';

const path = require('path'),
  glob = require('glob');

function toObject (paths) {
  const list = {};

  paths.forEach(path => {
    const name = path.split('/').slice(-1)[0],
      filename = name.split('.');

    filename.splice(-1,1);
    list[filename.join('.')] = path;
  });

  return list;
}

module.exports = {
  assetsPublicPath: '/',
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'files',
  chunks: toObject(glob.sync('./src/chunks/*.js')),
  excludeChunks: {

  }
};
