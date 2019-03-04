const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  node: {
    fs: 'empty'
  },
  entry: {
    main: './src/js/app.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/index.html'),
      filename: './index.html',
    }),
  ],
  devServer: {
    contentBase: './src/public',
    open: true, // When open is enabled, the dev server will open the browser.
    overlay: true, // Show a full-screen overlay in the browser when there are compiler errors or warnings.
  },
  devtool: 'source-map',
}