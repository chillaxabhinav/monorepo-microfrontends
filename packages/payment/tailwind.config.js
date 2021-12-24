const tailwindCommonConfig = require('../../tailwind.config'); // This should ideally come from a package
const merge = require('lodash.merge');

const configExtensionPayment = { // Mainly used for themes and other payment specific stuff

};

module.exports.paymentTailwind = configExtensionPayment;

module.exports = merge(tailwindCommonConfig, configExtensionPayment);