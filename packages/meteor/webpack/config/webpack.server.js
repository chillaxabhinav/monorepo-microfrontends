const path = require("path");
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const paths = require('../../shared/config/paths');

module.exports = function(env, argv) {

    const serverConfig = merge(
        common(true),
        {
            entry: {
                index: path.resolve(__dirname, '../../server/index.js')
            },
            name: 'server',
            target: 'node',
            externals: [
                nodeExternals(),
                {
                    'express': "require('express')"
                }
            ],
            output: {
                filename: '[name].js',
                path: paths.serverBuild,
                assetModuleFilename: 'assets/[name].[hash][ext][query]',
                publicPath: paths.publicPath
            },
            plugins: [],
            /**
             * @type {import('webpack').Configuration['stats']}
             */
            stats: {
                assets: false,
                cached: false,
				chunks: false,
				colors: true,
				hash: false,
				modules: false,
				reasons: false,
				timings: true,
				version: false
            }
        }
    );

    return serverConfig;
};
