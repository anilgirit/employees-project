const path = require('path');

module.exports = {
  entry: ["@babel/polyfill",'./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: 'bundle.js'
  },
  mode:"production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    static: "./",
    compress: true,
    port: 9000,
  },
};