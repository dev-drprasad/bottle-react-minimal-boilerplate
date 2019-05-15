
const path = require("path");

const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_ROOT = process.cwd();
const APP_SRC = 'client';
const APP_BUILD = 'static';

module.exports = {
  entry: path.join(APP_ROOT, APP_SRC, 'main.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-nested')(),
              ]
            }
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(APP_ROOT, APP_BUILD),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: path.join(APP_ROOT, APP_SRC, 'index.html'),
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ],
  devServer: {
    contentBase: path.join(APP_ROOT, APP_SRC),
    hot: true,
  }
};
