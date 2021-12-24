const tailwindCommonConfig = require('../../tailwind.config'); // This should ideally come from a package
const merge = require('lodash.merge');

const configExtensionHelpcenter = { // Mainly used for themes and other helpcenter specific stuff

};

module.exports.helpcenterTailwind = configExtensionHelpcenter;

module.exports = merge(tailwindCommonConfig, configExtensionHelpcenter);
