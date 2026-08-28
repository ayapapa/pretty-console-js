/**
 * `pino` integration sample 1:
 * A very simple sample that passes the arguments received by 
 * the console output function directly to `pino`.
 */
import { PrettyConsole, type LogEntry } from '@ayapapa-npm/pretty-console-js';
import { pino } from 'pino';

type PinoLogKey = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';;

function main() {
  
  const pinoLog = pino({ level: 'trace' });

  const onPrettyLog = ( logEntry: LogEntry ) => {
    const method = logEntry.method === 'log' ? 'info' : logEntry.method as PinoLogKey;
    pinoLog[method](logEntry.args);
  }

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'silent' });

  pretty.log("This is a test.", { abc: "Hello", xyx: "World" });
  // Output example. 
  // {"level":30,"time":1787879943258,"pid":7788,"hostname":"PC-LEODON","0":"This is a test.","1":{"abc":"Hello","xyx":"World"}}

}

main();
