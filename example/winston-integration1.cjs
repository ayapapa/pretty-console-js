/**
 * `winston` integration sample 1:
 * A simple case of forwarding PrettyConsole log entries to `winston`.
 */
const { PrettyConsole } = require('@ayapapa-npm/pretty-console-js');
const winston = require('winston');

function main() {
  const winstonLog = winston.createLogger({
    level: 'silly',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
    ],
  });

  const onPrettyLog = (logEntry) => {
    const method = {
      log: 'info',
      fatal: 'error',
      error: 'error',
      warn: 'warn',
      info: 'info',
      debug: 'debug',
      trace: 'silly',
    }[logEntry.method];

    winstonLog[method]('Extracted from PrettyConsole:', logEntry.args);
  };

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'silent' });

  pretty.log('This is a test.', { abc: 'Hello', xyx: 'World' });
  // Output example.
  // {"0":"This is a test.","1":{"abc":"Hello","xyx":"World"},"level":"info","message":"Extracted from PrettyConsole:"}
}

main();
