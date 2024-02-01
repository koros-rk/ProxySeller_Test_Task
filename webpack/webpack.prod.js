const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "..", "build"),
    publicPath: '/ProxySeller_Test_Task/',
    filename: "bundle.js",
  },
};
