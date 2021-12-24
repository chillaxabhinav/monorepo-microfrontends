const webpackClient = require('./webpack.client');
const webpackServer = require('./webpack.server');

module.exports = (env, opts) => [
    webpackClient(env, opts),
    webpackServer(env, opts)
];
