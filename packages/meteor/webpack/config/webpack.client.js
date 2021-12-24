const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const paths = require('../../shared/config/paths');
const common = require('./webpack.common');

function checkAdditionalDevPlugins() {
	return isDev ? [
		new BundleAnalyzerPlugin({ openAnalyzer: false })
	] : []
};

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = function(env, argv) {

	const resourceQuery = `?reload=true&path=http://localhost:${argv.ssr ? process.env.WEBPACK_PORT : process.env.PORT}/__webpack_hmr`
	const clientConfig = merge(
		common(false),
		{
			name: 'client',
			target: isDev ? 'web' : 'browserslist',
			entry: {
				main: [path.resolve(__dirname, "../../client/index.tsx"), isDev && `webpack-hot-middleware/client${resourceQuery}`].filter(Boolean)
			},
			output: {
				filename: '[name].[contenthash].js',
				path: paths.clientBuild,
				chunkFilename: '[name].[chunkhash].js',
				assetModuleFilename: 'assets/[name].[hash][ext][query]',
				publicPath: paths.publicPath
			},
			plugins: [
				new HtmlWebpackPlugin({
					hash: true,
					filename: './index.html',
					template: './src/index.html',
					inject: !(argv && argv.ssr)
				}),
				...checkAdditionalDevPlugins()
			],

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
				version: false,
			}
		}
	);

	return clientConfig;
};
