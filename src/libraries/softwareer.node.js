const k4itrunConfig = require('../../k4itrun.config');
const { Softwareer } = require('@softwareer/node');
const softwareer = new Softwareer(k4itrunConfig.softwareerKey);

module.exports = softwareer;