var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
 entry: './src/index.js',
 output: {
   path: path.join(__dirname, 'dist'),
   filename: 'bundle.js'
 },
 module: {
  loaders: [{
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  },
  {
   test: /\.css$/,
   loader: "style-loader!css-loader"
  },
  { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' }]
 },
 devServer: {
    contentBase: './dist'
 },
 plugins: [
    new HtmlWebpackPlugin({
       template: "src/index.html"
    })
 ]
}