const path = require('path');
const webpack = require('webpack');

module.exports = {
 

  resolve: {
    fallback: {
      
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
    },
  },

  plugins: [
    
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(require('dotenv').config().parsed),
    }),
  ],
};