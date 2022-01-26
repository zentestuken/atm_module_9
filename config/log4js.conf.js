const log4js = require('log4js');
const path = require('path');
const logPath = '../log/test.log';

const consoleLevel = 'info';
const fileLevel = 'debug';

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      level: consoleLevel,
    },
    file: {
      type: 'file',
      filename: path.resolve(__dirname, logPath),
      level: fileLevel,
    },
    consoleFilter: {
      type: 'logLevelFilter',
      appender: 'console',
      level: consoleLevel,
    },
  },
  categories: {
    default: {appenders: ['consoleFilter', 'file'], level: fileLevel},
  },
});

const logger = log4js.getLogger();


module.exports = logger;
