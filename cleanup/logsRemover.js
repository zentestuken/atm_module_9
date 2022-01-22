const fs = require('fs');
const logger = require('../config/log4js.conf');
const path = require('path');

const logDirPath = './log/';

fs.readdir(logDirPath, (err, files) => {
  if (err) logger.warn(`Could not read files in log directory: ${err}`);
  for (const file of files) {
    fs.unlink(path.join(logDirPath, file), (err) => {
      if (err) logger.warn(`Could not remove old log: ${err}`);
    });
  }
});
