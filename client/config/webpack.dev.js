const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: {
    0: 'react-hot-loader/patch',// activate HMR for React
    1: 'webpack-dev-server/client?http://localhost:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
    2: 'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    app: path.join(__dirname,'../js/index.tsx'), // the entry point of our app
  },
  devServer: {
    contentBase: [path.join(__dirname,'../'), path.join(__dirname,'../../node_modules/')],
    hot: true, // enable HMR on the server
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    },
    publicPath: '/dist/',
    watchOptions: {
      poll: 1000, // <-- it's worth setting a timeout to prevent high CPU load
      ignored: /node_modules/
  }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
  ]
});