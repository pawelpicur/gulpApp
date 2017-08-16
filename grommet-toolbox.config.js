import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server'

var bodyParser = require('body-parser');


export default {
  copyAssets: [
    'src/index.html',
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    }
  ],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/index.scss',
  devServer: {
    https: true
  },
  devServerHost: 'testchat.hpe.com',
  devServerPort: 3666,
  publicPath: '/SignForm'
};