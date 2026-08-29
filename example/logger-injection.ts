/**
 * An example of type-safe external logger injection. 
 */
import { PrettyConsole } from '@ayapapa-npm/pretty-console-js';

function main() {
  // For example, assume the existence of an external file logger or an existing system logger.
  const someLogger = {
    log: (...args: unknown[]) => console.log(`[Some]`, ...args),
    error: (...args: unknown[]) => console.error(`[Some-Error]`, ...args),
  };

  // To ensure compatibility, I wrapped someLogger and defined a provider.
  const safeProvider = {
    log:   (...args: unknown[]) => someLogger.log(...args),
    trace: (...args: unknown[]) => console.trace(`[Some]`, ...args),
    debug: (...args: unknown[]) => console.debug(`[Some-Debug]`, ...args),
    info:  (...args: unknown[]) => someLogger.log(...args),
    warn:  (...args: unknown[]) => someLogger.log(...args),
    error: (...args: unknown[]) => someLogger.error(...args),
  };

  const logger = new PrettyConsole({
    provider: safeProvider, // This way, it won't cause a TypeScript error.
  });

  logger.info('This will be formatted and then sent as a string to the provider.');
  // Output example:
  // [Some] [2026-08-29 10:08:41.924] INFO: This will be formatted and then sent as a string to the provider.
}

main();
