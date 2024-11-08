const webpack = require('webpack');

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  'module': {
    'rules': [{
      'use': 'babel-loader',
      'test': /\.ts$/,
      'exclude': /node_modules/,
      'options': {
        'plugins': ['lodash'],
        'presets': [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
      }
    }]
  },
  'plugins': [
    new CompressionPlugin(),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.UglifyJsPlugin
  ]
};