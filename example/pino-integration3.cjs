/**
 * `pino` integration sample 3:
 * A case where output to the console uses `PrettyConsole` 
 * and output to a file uses `pino`.
 */
const { PrettyConsole } = require('@ayapapa-npm/pretty-console-js');
const pino = require('pino');

function main() {
  const transport = pino.transport({
    target: 'pino/file',
    options: {
      destination: './logs/app.log',
      mkdir: true
    }
  })
  const pinoLog = pino({ level: 'trace' }, transport);

  const onPrettyLog = ( logEntry ) => {
    const method = logEntry.method === 'log' ? 'info' : logEntry.method;
    const err = logEntry.args.find(arg => arg instanceof Error);
    if (err) {
      pinoLog[method](err, logEntry.args);
    }
    else {
      pinoLog[method](logEntry.args);
    }
  }

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'trace' });

  try {
    const e =  new Error('Some error!');
    e.code = 'ESOMEERR';
    throw e;
  }
  catch (err) {
    pretty.error("Error occurred.", err);
  }
}

main();
