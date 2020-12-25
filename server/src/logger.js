const log4js = require("log4js");
const log4js_extend = require("log4js-extend");

log4js_extend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)",
});

const defaultLogLevel = log4js.levels.DEBUG;

// Log4js and pm2 related fix
// https://github.com/log4js-node/log4js-node/blob/master/docs/clustering.md
log4js.configure({
  appenders: { out: { type: "stdout" } },
  categories: { default: { appenders: ["out"], level: defaultLogLevel } },
  pm2: true,
});

const logger = log4js.getLogger("Marketsn");
logger.level = defaultLogLevel;

module.exports = { logger };
