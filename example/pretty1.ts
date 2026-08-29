import { PrettyConsole } from '@ayapapa-npm/pretty-console-js';

// Create instance
const logger = new PrettyConsole({ level: 'trace', callStack: true });

function someFunc(x: number, y: number, z: number) {
  logger.trace('entered someFunc():', 'args: ', 'x =', x, 'y =', y, 'z =', z);

  const obj = { jjj: true, iii: 123, hhh: 'hello', next: { ggg: "goodbye", ddd: "yesterday", yyy: 1998.092 } };
  logger.info(obj);

  const result = x * y - z;
  logger.debug("result =", result);

  try {
    throw new Error("Error!!");
  }
  catch (err) {
    logger.error("Error occuered.", err);
  }

  return result;
}

function main() {
  const res = someFunc(1, 2, 3);
  logger.log("someFunc() returns:", res);
}

main();
