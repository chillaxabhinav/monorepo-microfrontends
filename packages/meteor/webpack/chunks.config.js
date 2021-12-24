module.exports = {
    runtimeChunk: 'single',
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        maxAsyncRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
            chunks: 'all',
            enforce: true,
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            },
        },
    },
}
