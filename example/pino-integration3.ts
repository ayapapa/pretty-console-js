/**
 * `pino` integration sample 2:
 * A case where an `Error` instance is passed as the first argument 
 * to the `pino` logging function when such an instance is present.
 */
import { PrettyConsole, type LogEntry } from '@ayapapa-npm/pretty-console-js';
import pino from 'pino';

type PinoLogKey = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

function main() {
  const transport = pino.transport({
    target: 'pino/file',
    options: {
      destination: './logs/app.log',
      mkdir: true
    }
  })
  const pinoLog = pino(
    {
      level: 'trace',
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: label => ({ level: label.toUpperCase() }),
      }
    },
    transport
  );

  const onPrettyLog = ( logEntry: LogEntry ) => {
    const method = logEntry.method === 'log' ? 'info' : logEntry.method as PinoLogKey;
    const err = logEntry.args.find(arg => arg instanceof Error);
    if (err) {
      // Pino's type definition expects the second argument to be a string.
      // Use Reflect.apply to pass the arguments as-is.
      Reflect.apply(pinoLog[method], pinoLog, [err, logEntry.args]);    }
    else {
      pinoLog[method](logEntry.args);
    }
  }

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'trace' });

  try {
    throw Object.assign(new Error('Some error!'), { code: 'ESOMEERR' });
  }
  catch (err) {
    pretty.error("Error occurred.", err);
  }
}

main();
