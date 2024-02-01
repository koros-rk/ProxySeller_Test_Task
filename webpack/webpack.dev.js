const path = require("path");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "bundle.js",
  },
};
