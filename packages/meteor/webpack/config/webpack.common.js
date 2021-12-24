const path = require('path');
const aliasConfig = require('./../alias.config');
const pluginsConfig = require('./../plugins.config');
const isDev = process.env.NODE_ENV === 'development';

const basePaths = {
    loaders: './../loaders/',
    base: './../'
};

module.exports = function(node) {
  return {
		mode: isDev ? 'development' : 'production',
		module: {
			rules: [
					// require(path.resolve(__dirname, basePaths.loaders + 'css_loader.config')),
					require(path.resolve(__dirname, basePaths.loaders + 'asset_loader.config'))(node),
					require(path.resolve(__dirname, basePaths.loaders + 'babel_loader.config'))(node),
					// require(path.resolve(__dirname, basePaths.loaders + 'html_loader.config'))
			]
		},
		optimization: isDev
			? require(path.resolve(__dirname, basePaths.base + 'chunks.config'))
			: require(path.resolve(__dirname, basePaths.base + 'optimization.config')),
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			alias: aliasConfig
		},
		plugins: [
			...pluginsConfig(node)
		],
		devtool: isDev ? 'source-map' : 'hidden-source-map',
	}
}