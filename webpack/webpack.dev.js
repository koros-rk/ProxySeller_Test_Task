const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://jsonplaceholder.typicode.com')
    }),
  ]
};
