const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = ({ mode }) => {
  const modeConfig = require(`./webpack.${mode}.js`);
  const config = merge(commonConfig, modeConfig);

  return config;
};
