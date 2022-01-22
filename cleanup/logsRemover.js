const fs = require('fs');
const path = require('path');
const logger = require('../config/log4js.conf');

logPath = '../log/test.log';

/**
 * Checks if log file is older than today
 */
function logChecker() {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, logPath), 'utf8');
    const splitLines = data.split(/\r?\n/);
    const lastDate = splitLines[splitLines.length - 2].substring(1, 11);
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset();
    today.setHours(0, -timezoneOffset, 0, 0);
    if (new Date(lastDate) < today) {
      logger.info('Old log found. Removing.');
      logRemover();
    } else {
      // eslint-disable-next-line max-len
      logger.debug(` `);
      logger.debug(` `);
      logger.debug(`************** NEW TESTING SESSION STARTED **************`);
      console.log('Today\'s log found. Will append to it.');
    }
  } catch (err) {
    logger.warn(`Could not read the log: ${err}`);
    logRemover();
  }
}

/**
 * Removes the log file
 */
function logRemover() {
  try {
    fs.unlinkSync(path.resolve(__dirname, logPath));
    logger.debug(`Old log removed`);
  } catch (err) {
    logger.warn(`Could not remove old log: ${err}`);
  }
}

logChecker();
