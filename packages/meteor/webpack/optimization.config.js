const TerserPlugin = require('terser-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const chunksConfig = require('./chunks.config'); 

module.exports = {
    minimize: true,
    minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
        new HtmlMinimizerPlugin(),
        new CleanWebpackPlugin()
    ],
    ...chunksConfig
}
