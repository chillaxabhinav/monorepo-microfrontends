const tailwindCommonConfig = require('../../tailwind.config'); // This should ideally come from a package
const merge = require('lodash.merge');

const configExtensionFlight = { // Mainly used for themes and other flight specific stuff

};

module.exports.flightTailwind = configExtensionFlight;

module.exports = merge(tailwindCommonConfig, configExtensionFlight);
