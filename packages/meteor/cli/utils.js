const chalk = require('chalk');
const logMessage = (message, level = 'info') => {
    const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white'
    console.log(chalk[color](message))
}

const compilerPromise = (name, compiler) => {
    return new Promise((resolve, reject) => {
        compiler.hooks.compile.tap(name, () => {
            logMessage(`[${name}]: Compiling `)
        })
        compiler.hooks.done.tap(name, (stats) => {
            if (!stats.hasErrors()) {
                return resolve()
            }
            return reject(`[${name}]: Failed to compile`)
        })
    })
}

module.exports = {
    logMessage,
    compilerPromise,
}
