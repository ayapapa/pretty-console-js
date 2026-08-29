/**
 * `winston` integration sample 1:
 * A simple case of forwarding PrettyConsole log entries to `winston`.
 */
import { PrettyConsole, type LogEntry } from '@ayapapa-npm/pretty-console-js';
import winston from 'winston';

type WinstonLogKey = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

function main() {
  const winstonLog = winston.createLogger({
    level: 'silly',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
    ],
  });

  const onPrettyLog = (logEntry: LogEntry) => {
    const method: WinstonLogKey = {
      log: 'info',
      fatal: 'error',
      error: 'error',
      warn: 'warn',
      info: 'info',
      debug: 'debug',
      trace: 'silly',
    }[logEntry.method] as WinstonLogKey;

    winstonLog[method]('Extracted from PrettyConsole:', logEntry.args);
  };

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'silent' });

  pretty.log('This is a test.', { abc: 'Hello', xyx: 'World' });
  // Output example.
  // {"0":"This is a test.","1":{"abc":"Hello","xyx":"World"},"level":"info","message":"Extracted from PrettyConsole:"}
}

main();
