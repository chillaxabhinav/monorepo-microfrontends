const LoadablePlugin = require('@loadable/webpack-plugin').default;
const webpack = require("webpack");

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const shouldUseReactRefresh = process.env.REACT_REFRESH;
const definePlugin = (variables) => new webpack.DefinePlugin(variables);

const plugins = [
    definePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        '__SERVER__': JSON.stringify(false)
    }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && shouldUseReactRefresh && new ReactRefreshWebpackPlugin({}),
    new LoadablePlugin({filename: 'build-stats.json'}),
].filter(Boolean);

module.exports = (node) =>( node ? [
    definePlugin({
        '__SERVER__': JSON.stringify(true)
    })
] : plugins);
