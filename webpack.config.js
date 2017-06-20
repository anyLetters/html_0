'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
		'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
     "./index.js"
	],
    output: {
      path: path.resolve(__dirname, "dist/"),
      filename: "bundle.js"
    },
    watch: true,
    devServer: {
        contentBase: 'dist',
        compress: true,
        port: 3000,
				inline: true,
        hot: true
  },
  watchOptions: {
    ignored: [/node_modules/, /\.json$/, /\.hot-update$/, /\.png$/]
  },
  devtool: 'source-map',
   module: {
    rules: [
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      { 
        test: /\.png$/,
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      {
        test: /\.sass$/, // files ending with .scss
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./stylesheets/style.css')
  ]
};