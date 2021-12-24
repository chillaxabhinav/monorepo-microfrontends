const tailwindCommonConfig = require('../../tailwind.config'); // This should ideally come from a package
const merge = require('lodash.merge');

const configExtensionBus = { // Mainly used for themes and other bus specific stuff

};

module.exports.busTailwind = configExtensionBus;

module.exports = merge(tailwindCommonConfig, configExtensionBus);
