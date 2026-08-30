/**
 * `pino` integration sample 2:
 * A case where an `Error` instance is passed as the first argument 
 * to the `pino` logging function when such an instance is present.
 */
const { PrettyConsole } = require('@ayapapa-npm/pretty-console-js');
const pino = require('pino');

function main() {
  const pinoLog = pino({ level: 'trace' });

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

  const pretty = new PrettyConsole({ onLog: onPrettyLog, level: 'silent' });

  try {
    const e =  new Error('Some error!');
    e.code = 'ESOMEERR';
    throw e;
  }
  catch (err) {
    pretty.error("Error occurred.", err);
  }
  // Output example.
  // {"level":30,"time":1787881404482,"pid":2868,"hostname":"PC-LEODON","err":{"type":"Error","message":"Some error!","stack":"Error: Some error!\n    at main (D:\\dev\\pretty-console-js\\sample\\pino-integration2.cjs:26:16)\n    at Object.<anonymous> (D:\\dev\\pretty-console-js\\sample\\pino-integration2.cjs:35:1)\n    at Module._compile (node:internal/modules/cjs/loader:1830:14)\n    at Object..js (node:internal/modules/cjs/loader:1961:10)\n    at Module.load (node:internal/modules/cjs/loader:1553:32)\n    at Module._load (node:internal/modules/cjs/loader:1355:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)\n    at node:internal/main/run_main_module:33:47","code":"ESOMEERR"},"msg":["Error occurred.",{"code":"ESOMEERR"}]}
}

main();
