/**
 * `winston` integration sample 2:
 * A case where an `Error` instance is specially handled
 * when such an instance is present.
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
      log:    'info',
      fatal:  'error',
      error:  'error',
      warn:   'warn',
      info:   'info',
      debug:  'debug',
      trace:  'silly',
    }[logEntry.method];
    const err = logEntry.args.find(arg => arg instanceof Error);
    if (err) {
      winstonLog[method]('Extracted from PrettyConsole:', err, logEntry.args);
    }
    else {
      winstonLog[method]('Extracted from PrettyConsole:', logEntry.args);
    }
  };

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'silent' });

  try {
    throw Object.assign(new Error('Some error!'), { code: 'ESOMEERR' });
  }
  catch (err) {
    pretty.error("Error occurred.", err);
  }
  // Output example.
  // {"code":"ESOMEERR","level":"error","message":"Extracted from PrettyConsole: Some error!","stack":(The rest is omitted...)
}

main();
