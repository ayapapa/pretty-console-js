/**
 * `pino` integration sample 1:
 * A very simple sample that passes the arguments received by 
 * the console output function directly to `pino`.
 */
const { PrettyConsole } = require('@ayapapa-npm/pretty-console-js');
const pino = require('pino');

function main() {
  
  const pinoLog = pino({ level: 'trace' });

  const onPrettyLog = (logEntry) => {
    const method = logEntry.method === 'log' ? 'info' : logEntry.method;
    pinoLog[method](logEntry.args);
  }

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'silent' });

  pretty.log("This is a test.", { abc: "Hello", xyx: "World" });
  // Output example. 
  // {"level":30,"time":1787879943258,"pid":7788,"hostname":"PC-LEODON","0":"This is a test.","1":{"abc":"Hello","xyx":"World"}}
}

main();
