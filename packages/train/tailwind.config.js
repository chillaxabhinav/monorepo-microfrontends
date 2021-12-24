const tailwindCommonConfig = require('../../tailwind.config'); // This should ideally come from a package
const merge = require('lodash.merge');

const configExtensionTrains = { // Mainly used for themes and other train specific stuff

};

module.exports.trainTailwind = configExtensionTrains;

module.exports = merge(tailwindCommonConfig, configExtensionTrains);
