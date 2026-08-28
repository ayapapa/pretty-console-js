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
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
    ],
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

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'silent' });

  try {
    throw Object.assign(new Error('Some error!'), { code: 'ESOMEERR' });
  }
  catch (err) {
    pretty.error("Error occured.", err);
  }
  // Output example.
  // {"code":"ESOMEERR","level":"error","message":"Extracted from PrettyConsole: Some error!","stack":"Error: Some error!\n    at main (file:///D:/dev/pretty-console-js/sample/winston-integration2.ts:42:25)\n    at file:///D:/dev/pretty-console-js/sample/winston-integration2.ts:51:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:437:25)\n    at async node:internal/modules/esm/loader:639:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)"}
}

main();
