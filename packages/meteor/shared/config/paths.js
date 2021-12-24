const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const paths = {
    clientBuild: resolveApp('dist/client'),
    serverBuild: resolveApp('dist/server'),
    publicPath: '/s/',
    loadableClientStatsFile: () => resolveApp(
        `build/client/s/build-stats.json`
    ),
    appEntryFile: resolveApp('routes'),
    resolveApp
}

module.exports = paths;