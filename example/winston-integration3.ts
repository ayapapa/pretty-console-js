/**
 * `winston` integration sample 2:
 * A case where an `Error` instance is specially handled
 * when such an instance is present.
 */
import { PrettyConsole, type LogEntry } from '@ayapapa-npm/pretty-console-js';
import winston from 'winston';

type WinstonLogKey = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

function main() {
  const winstonLog = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'logs/app.log' })
    ]
  });

  const onPrettyLog = (logEntry: LogEntry) => {
    const method: WinstonLogKey = {
      log:    'info',
      fatal:  'error',
      error:  'error',
      warn:   'warn',
      info:   'info',
      debug:  'debug',
      trace:  'silly',
    }[logEntry.method] as WinstonLogKey;
    const err = logEntry.args.find(arg => arg instanceof Error);
    if (err) {
      winstonLog[method]('Extracted from PrettyConsole:', err, logEntry.args);
    }
    else {
      winstonLog[method]('Extracted from PrettyConsole:', logEntry.args);
    }
  };

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'trace' });

  try {
    throw Object.assign(new Error('Some error!'), { code: 'ESOMEERR' });
  }
  catch (err) {
    pretty.error("Error occurred.", err);
  }
}

main();
