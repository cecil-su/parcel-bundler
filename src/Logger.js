const chalk = require('chalk');
const readline = require('readline');
const prettyError = require('./utils/prettyError');

class Logger {
  constructor(options) {
    this.logLevel = typeof options.logLevel === 'number' ? options.logLevel : 3;
    this.color =
      typeof options.color === 'boolean' ? options.color : chalk.supportsColor;
    this.chalk = new chalk.constructor({enabled: this.color});
    this.lines = 0;
    this.statusLine = null;
  }

  write() {}

  log() {}

  persistent() {}

  warn() {}

  error() {}

  clear() {}

  writeLine() {}

  status() {}
}

module.exports = Logger;
