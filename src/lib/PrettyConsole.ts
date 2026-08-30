import util from 'node:util';
import { DateFormatter } from '@ayapapa-npm/date-formatter-js';

/** Log levels */
const logLevels = {
  trace:  10,
  debug:  20,
  info:   30,
  warn:   40,
  error:  50,
  fatal:  60,
  log:    90,
  silent: 100 
} as const;

/** Log level type */
export type LogLevel = keyof typeof logLevels; 

/** Compare function type */
export type CompareFn = <T>(a: T, b: T) => number;

/** Type of the console replacement object. */
export type LogProvider = Pick<Console,  'log' | 'error' | 'warn' | 'info' | 'debug' | 'trace'> & { fatal?: (...a: unknown[]) => void };

/** Log method type */
export type LogMethod = keyof LogProvider; 

/** LogEntry type */
export interface LogEntry {
  /** Log output time. */
  readonly timestamp: Date;

  /** Logging method. */
  readonly method: LogMethod;

  /**
   * Arguments passed to the logging method.
   * 
   * This array can be modified by the `onLog` callback.
   * Any changes are reflected in subsequent PrettyConsole processing. 
   */
  args: unknown[];
}

/**
 * configuration definition. 
 * The 'breakLength' option and what follows are options that are passed directly
 * to the Configuration Options of util.inspect(). You can also specify 
 * Configuration Options for util.inspect() that are not described here.
 * For more information, see the description of
 * {@link https://nodejs.org/api/util.html#utilinspectobject-options util.inspect() Configuration Options}.
 */
export interface Config {
  /**
   * Desired logging level. 
   * In order of priority, available levels are:
   *  - 'trace':  Output logs for all levels.
   *  - 'debug':  Output logs for 'debug' and higher levels.
   *  - 'info':   Output logs for 'info' and higher levels.
   *  - 'warn':   Output logs for 'warn' and higher levels.
   *  - 'error':  Output logs for 'error' and 'fatal' levels.
   *  - 'fatal':  Output logs only for the 'fatal' level.
   *  - 'silent': No output logs.
   * If omitted, defaults to `'info'`.
   * @default 'info'
   */
  level?: LogLevel;

  /**
   * Whether to output timestamps. 
   * If set to `true`, the timestamp is output.
   * If omitted, defaults to `true`.
   * @default true
   */
  timestamp?: boolean;

  /**
   * Whether to output logging level name. 
   * If set to `true`, the log level name is output.
   * For each call to `trace()`, `debug()`, `info()`, `warn()`, `error()`, and `fatal()`, 
   * the corresponding `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, and `FATAL` is output.
   * Since `log()` is level-agnostic, the `Level Name` is not output when `log()` is used.
   * If omitted, defaults to `true`.
   * @default true
   */
  levelName?: boolean

  /**
   * Whether to output the call stack in `trace()`. 
   * If set to `true`, the call stack is added to `trace`-level logs. 
   * Note: This applies only to `trace`-level logs.
   * If omitted, defaults to `false`.
   * @default false
   */
  callStack?: boolean;

  /**
   * Alternative to `console`.
   * If omitted, `console` is used.
   * @default console
   */
  provider?: LogProvider;

  /**
   * Whether or not to use PrettyConsole's `pretty` output.
   * If omitted, `pretty` is `true`.
   * @default true
   */
  pretty?: boolean;

  /**
   * A callback function that receives each log call before level filtering and formatting.
   * @default undefined
   */
  onLog?: (logEntry: LogEntry) => void;

  /**
   * Specifies the length at which input values are split across multiple lines.
   * Set to Infinity to format the input as a single line
   * (in combination with compact set to true or any number >= 1).
   * If omitted, default to `120`.
   * @default 120
   */
  breakLength?: number;

  /**
   * Whether to color the output. 
   * If set to `true`, the output is styled with ANSI color codes.
   * Colors are customizable. See {@link https://nodejs.org/api/util.html#customizing-utilinspect-colors Customizing util.inspect colors}. 
   * If omitted, default to `true`.
   * @default true
   */
  colors?: boolean;

  /**
   * Whether to make the object output compact.
   * Setting this to false causes each object key to be displayed on a new line.
   * It will break on new lines in text that is longer than breakLength.
   * If set to a number, the most n inner elements are united on a single line
   * as long as all properties fit into breakLength.
   * Short array elements are also grouped together.
   * If omitted, default to `false`.
   * @default false
   */
  compact?: boolean | number;

  /**
   * Specifies the maximum recursion depth for nested objects.
   * Use null to inspect all levels recursively.
   * If omitted, default to `null`.
   * @default null
   */
  depth?: number | null;

  /**
   * Specifies the maximum number of Array, TypedArray, Map, WeakMap, and WeakSet
   * elements to include when formatting. Set to null or Infinity to show all elements.
   * Set to 0 or negative to show no elements. 
   * For more information, see the description of
   * {@link https://nodejs.org/api/util.html#utilinspectobject-options util.inspect() Configuration Options}.
   * If omitted, default to `100`.
   * @default 100
   */
  maxArrayLength?: number | null;

  /**
   * Specifies the maximum number of characters to include when formatting.
   * Set to null or Infinity to show all elements.
   * Set to 0 or negative to show no characters.
   * If omitted, default to `12800`.
   * @default 12800
   */
  maxStringLength?: number | null;

  /**
   * If set to `true` or a `function`, all properties of an object,
   * and Set and Map entries are sorted in the resulting string.
   * If set to `true`, the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort default sort}
   * is used. If set to a function, it is used as a
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters compare function}.
   * If omitted, default to `true`.
   * @default true
   */
  sorted?: boolean | CompareFn;
};

export type ConfigKey = keyof Config;

/**
 * PrettyConsole, that is a tiny wrapper around the standard Node.js console.
 * 
 * ### Why?
 * 
 * While developing Node.js libraries, I found myself using console for most debugging tasks
 * because it is simple and always available. However, I often wanted a few extra features
 * without introducing a full-featured logging framework.
 * 
 * So I created pretty-console.
 *
 * It keeps the familiar console API while adding a few small conveniences for everyday development.
 * 
 * However, debugging tasks such as file I/O, mutual exclusion, and asynchronous processing became complex, 
 * and I found myself wanting a logger capable of writing to a file.
 * For this reason, decided to include functionality to integrate with a standard file logger.
 *  
 * ### Features
 * 
 * - Displays deeply nested objects using `util.inspect()`.
 * - Supports configurable log levels (`'trace'`, `'debug'`, `'info'`, `'warn'`, `'error'`, `'fatal'`, and `'silent'`).
 * - Optional timestamps.
 * - Optional colored output.
 * - Configurable formatting options.
 * - Optional console-compatible external logger injection.
 * - Optional callback function to receive each log call before formatting. It is convenient when integrating with a file logger.
 *  
 * The goal is not to replace logging frameworks such as {@link https://www.npmjs.com/package/pino Pino} or {@link https://www.npmjs.com/package/winston Winston}, but to make the built-in console more pleasant to use during development.
 */
export class PrettyConsole {

  /** 
   * Static fields
   */
  /** Default logging level */
  static readonly #defaultLevel: LogLevel = 'info';

  /** Default configuration */
  static readonly #defaultConf: Config  = {
    level:            PrettyConsole.#defaultLevel,
    timestamp:        true,
    levelName:        true,
    callStack:        false,
    provider:         console,
    pretty:           true,
    breakLength:      120,
    colors:           true,
    compact:          false,
    depth:            null,
    maxArrayLength:   100,
    maxStringLength:  12800,
    sorted:           true,
  };

  /** 
   * Static methods
   */
  
  /**
   * Get default configuration.
   * @returns Default configuration.
   */
  public static getDefaultConfig(): Config {
    return {...PrettyConsole.#defaultConf};
  }

  /** 
   * Instance fields
   */

  /** Current configuration */
  #config: Config = { ...PrettyConsole.#defaultConf };

  /** Logger. */
  #logger: LogProvider = console;


  /**
   * Instance methods
   */

  /**
   * Creates a PrettyConsole instance.
   * @param config  Initial configuration.
   * @default `PrettyConsole.#defaultConf`
   */
  constructor(config: Config = PrettyConsole.#defaultConf) {
    this.setConfig(config);
  }

  /**
   * Update the current configuration with the specified options.
   * @param config Configuration options to update.
   */
  public setConfig(config: Config): void {
    this.#config = this.#resolvedConfig(config);
    this.#logger = this.#resolveLogger(this.#config.provider);
  }

  /**
   * Get current configuration.
   * @returns Current configuration.
   */
  public getConfig(): Config {
    return {...this.#config};
  }

  /**
   * Reset the current configuration to the default configuration.
   */
  public resetConfig(): void {
    this.setConfig(PrettyConsole.#defaultConf);
  }

  /**
   * Get default configuration.
   * @returns Default configuration.
   */
  public getDefaultConfig(): Config {
    return PrettyConsole.getDefaultConfig();
  }

  /**
   * Output information without a level name. No output is produced when the configured level is `silent`.
   * @param args  An array of values ​​to be output.
   */
  public log(...args: unknown[]) {
    this.#output('log', args, (...a) => (this.#logger.log ?? this.#logger.info)(...a));
  }

  /**
   * Output information at the 'trace' level.
   * If 'callStack' is true, the call stack is also output.
   * @param args  An array of values ​​to be output.
   */
  public trace(...args: unknown[]) {
    if (this.#config.callStack) {
      const obj: { stack?: string } = {};
      Error.captureStackTrace(obj, this.trace);
      obj.stack = obj.stack ? obj.stack.replace(/^Error\b/, 'Call stack') : `Call stack: couldn't get`;
      args.push('\n' + obj.stack);
    }
    this.#output('trace', args, (...a) => this.#logger.trace(...a));
  }

  /**
   * Output information at the 'debug' level.
   * @param args  An array of values ​​to be output.
   */
  public debug(...args: unknown[]) {
    this.#output('debug', args, (...a) => this.#logger.debug(...a));
  }

  /**
   * Output information at the 'info' level.
   * @param args  An array of values ​​to be output.
   */
  public info(...args: unknown[]) {
    this.#output('info', args, (...a) => this.#logger.info(...a));
  }

  /**
   * Output information at the 'warn' level.
   * @param args  An array of values ​​to be output.
   */
  public warn(...args: unknown[]) {
    this.#output('warn', args, (...a) => this.#logger.warn(...a));
  }

  /**
   * Output information at the 'error' level.
   * @param args  An array of values ​​to be output.
   */
  public error(...args: unknown[]) {
    this.#output('error', args, (...a) => this.#logger.error(...a));
  }

  /**
   * Output information at the 'fatal' level.
   * @param args  An array of values ​​to be output.
   */
  public fatal(...args: unknown[]) {
    this.#output('fatal', args, (...a) => (this.#logger.fatal ?? this.#logger.error)(...a));
  }

  /**
   * Check whether to output logs.
   * @param method Log method.
   * @returns true if `method` is enabled by the current log level, and false otherwise.
   */
  #shouldLog(method: LogMethod): boolean {
    return logLevels[method as LogLevel] >= logLevels[this.#config.level ?? PrettyConsole.#defaultLevel];
  }

  /**
   * Resolve the console-compatible logger from the configured provider.
   */
  #resolveLogger(provider: LogProvider | undefined): LogProvider {
    if (provider === undefined || provider === console) {
      const logger = Object.create(console);
      // Replace `console.trace()` with `debug()` because its default behavior prints a stack trace.
      logger.trace = logger.debug;
      return logger;
    }
    return provider;
  }

  /**
   * Validate the configuration settings and fill unspecified options with their current values.
   *
   * @internal
   * @param config  
   * @returns Resolved configuration
  */
  #resolvedConfig(config: Config): Config {
    const rConf = {...config};
    const checkType = <K extends keyof Config>(key: K , typeChecker: (v: Config[K]) => boolean) => {
      if (Object.hasOwn(config, key)) {
        if (!typeChecker(config[key])) {
          throw new TypeError(`Type mismatch for config.${key}.`);
        }
      }
    }

    const validator: Record<keyof Config, (v: unknown) => boolean> = {
      level:          (v) => typeof v === 'string' && Object.hasOwn(logLevels, v),
      timestamp:      (v) => typeof v === 'boolean',
      levelName:      (v) => typeof v === 'boolean',
      callStack:      (v) => typeof v === 'boolean',
      provider:       (v) => {
        if (typeof v !== 'object' || v === null) return false;
        const p = v as Partial<LogProvider>;
        return typeof p.log === 'function' &&
          typeof p.trace === 'function' &&
          typeof p.debug === 'function' &&
          typeof p.info === 'function' &&
          typeof p.warn === 'function' &&
          typeof p.error === 'function' &&
          (p.fatal === undefined || typeof p.fatal === 'function');
      },
      pretty:         (v) => typeof v === 'boolean',
      onLog:          (v) => typeof v === 'function',
      breakLength:    (v) => typeof v === 'number' ,
      colors:         (v) => typeof v === 'boolean',
      compact:        (v) => typeof v === 'boolean' || typeof v === 'number',
      depth:          (v) => typeof v === 'number'  || v === null,
      maxArrayLength: (v) => typeof v === 'number'  || v === null,
      maxStringLength:(v) => typeof v === 'number'  || v === null,
      sorted:         (v) => typeof v === 'boolean' || typeof v === 'function',
    }

    const keys = Object.keys(validator) as Array<keyof Config>;
    for (const key of keys) {
      checkType(key, validator[key]);
    }


    // Fill options with current values, and return.
    return {...this.getConfig(), ...rConf};
  }

  /**
   * Format the log arguments.
   * 
   * @param args  An array of values ​​to be output.
   * @param date  Timestamp for this log entry.
   * @returns An array of formatted values ​​to be output, or a `string`.
   */
  #format(method: LogMethod, date: Date, args: unknown[]): unknown[] {
    args = this.#addPrefixes(method, args);
    args = this.#addTimestamp(date, args);
    return this.#toPretty(args);
  }

  /**
   * Format a Date instance. 
   * 
   * @param date  Date to format.
   * @returns A formatted date-time string.
   */
  #formatDate(date: Date) {
    return DateFormatter.format(new Date(date), "yyyy-MM-dd HH:mm:ss.fff");
  }

  /**
   * Add a prefix to the array of output values.
   * 
   * @param args  An array of values ​​to be output.
   * @param method Log method name.
   * @returns An array of output values ​​with a prefix added.
   */
  #addPrefixes(method: LogMethod, args: unknown[]): unknown[] {
    if (method !== 'log' && this.#config.levelName) args.unshift(`${method.toUpperCase()}:`);
    return args;
  }

  #addTimestamp(date: Date, args: unknown[]): unknown[] {
    if (this.#config.timestamp) args.unshift(`[${this.#formatDate(date)}]`);
    return args;
  }

  /**
   * Output log.
   * 
   * @param method Log method.
   * @param args  An array of values ​​to be output.
   * @param logFn Function to output the log.
   */
  #output(method: LogMethod, args: unknown[], logFn: (...a: unknown[]) => void): void {
    const date: Date = new Date();
    const logEntry: LogEntry = this.#getLogEntry(method, new Date(date), args);
    if (this.#config.onLog) {
      this.#config.onLog(logEntry);
    }
    if (this.#shouldLog(method)) {
      logFn(...this.#format(method, date, logEntry.args));
    }
  }

  /**
   * Obtain the log information to be passed to `Config.onLog`.
   */
  #getLogEntry(method: LogMethod, date: Date, args: unknown[]): LogEntry {
    return { timestamp: new Date(date), method, args }
  }

  /**
   * Format the log arguments as specified. This is one of the purposes of this library.
   */ 
  #toPretty(args: unknown[]): unknown[] {
    return Boolean(this.#config.pretty) === false ? 
      args : 
      args.map((value: unknown) => {
      if (value instanceof Error) {
        return value;
      }
      if (typeof value === "object" && value !== null) {
        return util.inspect(value, this.#config);
      }
      return value;
    });
  }

}


