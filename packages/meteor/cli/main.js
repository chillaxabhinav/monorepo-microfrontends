const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { logMessage } = require('./utils');

const args = yargs(hideBin(process.argv)).argv;
const isDev = process.env.NODE_ENV !== "production";
if(args.cwd) {
    process.chdir(args.cwd);
}
logMessage(`Current Working directory is: ${process.cwd()}`, 'info')

const command = args._[0];
const defaultEnv = command === 'dev' ? 'development' : 'production';

process.env.NODE_ENV = process.env.NODE_ENV || defaultEnv;
process.env.PORT = Number(process.env.PORT || 4000);
process.env.WEBPACK_PORT = process.env.WEBPACK_PORT || (args.ssr ? Number(process.env.PORT) + 1 : process.env.PORT);

if(command === "dev") {
    require('./scripts/dev')(isDev, args);
}
