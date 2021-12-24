const merge = require('lodash.merge');
const tailwindCommonConfig = require('../../tailwind.config');
const { busTailwind } = require('@ixigo/bus/tailwind.config');
const { flightTailwind } = require('@ixigo/flight/tailwind.config');
const { helpcenterTailwind } = require('@ixigo/helpcenter/tailwind.config');
const { paymentTailwind } = require('@ixigo/payment/tailwind.config');
const { trainTailwind } = require('@ixigo/train/tailwind.config');

const tailwindConfigs = [
    busTailwind,
    flightTailwind,
    helpcenterTailwind,
    paymentTailwind,
    trainTailwind
];

const reducer = (previousValue, currentValue) => merge(previousValue, currentValue);

const finalMergedConfig = tailwindConfigs.reduce(reducer, tailwindCommonConfig);

module.exports = finalMergedConfig;
