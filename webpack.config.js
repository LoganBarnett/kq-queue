/*******************************************************************************
The MIT License (MIT)

Copyright (c) 2015 Logan Barnett (logustus@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*******************************************************************************/
// @flow
const { merge, append } = require('ramda')
const BabelFlowWebpackPlugin = require('babel-flow-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssNext = require('postcss-cssnext')
const customProperties = require('postcss-custom-properties')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const styleVars = require('./style-vars.js')

const customPropertiesPlugin = customProperties()
customPropertiesPlugin.setVariables(styleVars)

module.exports = {
  devtool: '#source-map',
  context: path.join(__dirname, 'client'),
  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack-hot-middleware/client',
    './app.jsx',
  ],
  output: {
    filename: 'client.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new BabelFlowWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-modules-flow-types-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
                minimize: false,
                modules: true,
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  customPropertiesPlugin,
                  autoprefixer(),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [
          /client/,
        ],
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.html$/,
        exclude: /index\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            // minimize: false,
            // removeComments: false,
            // collapseWhitespace: false,
          },
        },
      },
      {
        test: /\.(svg|jpe?g|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            prefix: '/assets/images',
            name: 'assets/images/[name].[ext]',
            limit: 1000,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            prefix: 'font',
            limit: 1000,
          },
        },
      },
    ],
  },
}
