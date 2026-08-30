import { describe, expect, it, vi, type Mock } from 'vitest';
import { PrettyConsole, type LogLevel, type Config, type ConfigKey, type CompareFn, type LogEntry, type LogMethod, type LogProvider } from '../src/index.ts';
import { pino, transport, LevelWithSilentOrString, LoggerOptions } from 'pino';
import { Writable } from 'node:stream'

const pinoOptions: LoggerOptions = {
  level: 'trace',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: label => ({ level: label.toUpperCase() }),
  },
};

const pinoLogger = pino(pinoOptions);

type ProviderKey = 'trace' | 'log' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' ;
type Provider = Record<ProviderKey, Mock>;

class MemoryStream extends Writable {
  chunks: string[] = []

  _write(chunk: Buffer | string, _enc: BufferEncoding, cb: () => void) {
    this.chunks.push(String(chunk))
    cb()
  }

  text() {
    return this.chunks.join('')
  }
}

describe('PrettyConsole', () => {

  const equalConfigs = (c1: Config, c2: Config): boolean => {
    const keys1 = Object.keys(c1) as Array<ConfigKey>;
    const keys2 = Object.keys(c2) as Array<ConfigKey>;

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (c1[key] !== c2[key]) return false;
    }

    return true;
  };

  const checkDefaultCong = (config?: Config) => {
    const defConf = config ?? PrettyConsole.getDefaultConfig();
    expect(defConf.level).toBe('info');
    expect(defConf.timestamp).toBe(true);
    expect(defConf.levelName).toBe(true);
    expect(defConf.callStack).toBe(false);
    expect(defConf.breakLength).toBe(120);
    expect(defConf.colors).toBe(true);
    expect(defConf.compact).toBe(false);
    expect(defConf.depth).toBe(null);
    expect(defConf.maxArrayLength).toBe(100);
    expect(defConf.maxStringLength).toBe(12800);
    expect(defConf.sorted).toBe(true);
  }

  it('default configurations are valid', () => {
    checkDefaultCong();
  });

  const testConf: Config = {
    level: 'trace',
    timestamp: false,
    levelName: false,
    callStack: true,
    provider: console,
    breakLength: 100,
    colors: false,
    compact: true,
    depth: 3,
    maxArrayLength: 80,
    maxStringLength: 8000,
    sorted: false
    }

  it('set configurations are valid', () => {
    const logger = new PrettyConsole(testConf);
    const conf = logger.getConfig();
    expect(conf.level).toBe(testConf.level);
    expect(conf.timestamp).toBe(testConf.timestamp);
    expect(conf.levelName).toBe(testConf.levelName);
    expect(conf.callStack).toBe(testConf.callStack);
    expect(conf.provider).toBe(testConf.provider);
    expect(conf.breakLength).toBe(testConf.breakLength);
    expect(conf.colors).toBe(testConf.colors);
    expect(conf.compact).toBe(testConf.compact);
    expect(conf.depth).toBe(testConf.depth);
    expect(conf.maxArrayLength).toBe(testConf.maxArrayLength);
    expect(conf.maxStringLength).toBe(testConf.maxStringLength);
    expect(conf.sorted).toBe(testConf.sorted);
  });

  it('default configurations are invariant', () => {
    const defConf = PrettyConsole.getDefaultConfig();
    Object.assign(defConf, testConf);
    checkDefaultCong();
  });

  it('if reset current configurations, they become default set', () => {
    const logger = new PrettyConsole(testConf);
    logger.resetConfig();
    checkDefaultCong(logger.getConfig());
  });

  it('current configurations are invariant', () => {
    const logger = new PrettyConsole();
    let conf = logger.getConfig();
    Object.assign(conf, testConf);
    expect(equalConfigs(logger.getDefaultConfig(), logger.getConfig())).toBe(true);
  });

  /**
   * Copy the isomorphic object elements and then call the callback function. 
   * This function was created out of the need for type safety. 
   * This was introduced as a countermeasure because copying elements of the same type and key in a for statement would result in a type error.
   */
  function copyEach<T extends object, K extends keyof T>(target: T, source: T, cb: () => void) {
    const keys = Object.keys(source) as Array<K>;
    for (const key of keys) {
      target[key] = source[key];
      cb();
    }
  }
  
  it('Only the keys specified in `setConfig()` are modified.', () => {
    const logger = new PrettyConsole();
    const testConfs: Config[] = [
      {
        level: "silent",
        timestamp: false,
        levelName: false,
        callStack: true,
        provider: createProvider(),
        pretty: false,
        breakLength: 99,
        colors: false,
        compact: true,
        depth: 3,
        maxArrayLength: 80,
        maxStringLength: 10000,
        sorted: false,
      },
      {
        level: "trace",
        timestamp: true,
        levelName: true,
        callStack: false,
        provider: createProvider(),
        pretty: true,
        breakLength: 101,
        colors: true,
        compact: false,
        depth: 4,
        maxArrayLength: 99,
        maxStringLength: 10001,
        sorted: true,
      },
    ];
    const keys = Object.keys(testConf) as Array<keyof Config>;
    for (let i = 0; i < testConfs.length; i++) {
      const conf = logger.getConfig();
      const newConf: Config = {};

      copyEach(newConf, testConfs[i], () => {
        logger.setConfig(newConf);
        const curConf = logger.getConfig();
        const expConf = { ...conf, ...newConf };
        expect(equalConfigs(curConf, expConf)).toBeTruthy();;
      });
    }
  });

  const levelToProviderKey: Record<LogLevel, ProviderKey> = {
    trace:  'trace',
    debug:  'debug',
    info:   'info',
    warn:   'warn',
    error:  'error',
    fatal:  'fatal',
    log:    'log',
    silent: 'info',
  };

  const createProvider = (): Provider => ({
    trace: vi.fn(),
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn(),
  });

  const testOutputContents = (
    level: LogLevel,
    msg: string,
    addConf: { callStack?: boolean } = {},
    method: string = ''
  ): void => {

    const provider: Provider = createProvider();
    const logger = new PrettyConsole({ level, provider, ...addConf });
    const realKey = levelToProviderKey[level];

    method = method === '' ? realKey : method;
    logger[method as ProviderKey](msg);

    const args = provider[method as ProviderKey].mock.calls[0];

    if (level === 'silent') {
      expect(args).toBeUndefined();
    }
    else {
      expect(args[1]).toContain(level.toUpperCase() + ':');
      expect(args[2]).toContain(msg);
      if (addConf?.callStack) {
        expect(args[3]).toContain('Call stack:');
      }
    }
  };

  it('Output a trace log.', () => {
    testOutputContents('trace', 'trace test', {callStack: true});
  });

  it('Output a debug log.', () => {
    testOutputContents('debug', 'debug test');
  });

  it('Output a info log.', () => {
    testOutputContents('info', 'info test');
  });

  it('Output a warn log.', () => {
    testOutputContents('warn', 'warn test');
  });

  it('Output a error log.', () => {
    testOutputContents('error', 'error test');
  });

  it('Output a fatal error log.', () => {
    testOutputContents('fatal', 'fatal test');
  });

  it('Output a silent log.', () => {
    testOutputContents('silent', 'silent test');
  });

  it('Output a silent log using `log()`.', () => {
    testOutputContents('silent', 'silent test', {}, `log`);
  });

  it('should still trigger onLog callback even when level is silent', () => {
    const onLogMock = vi.fn();
    const logger = new PrettyConsole({
      level: 'silent',
      onLog: onLogMock
    });

    // Verify whether onLog triggers when the method is called, even in `silent` mode.
    logger.info('This is an info message');

    expect(onLogMock).toHaveBeenCalledTimes(1);
    const entry = onLogMock.mock.calls[0][0];
    expect(entry.method).toBe('info');
    expect(entry.args).toContain('This is an info message');
  });

  const checkInvalidProperty = (key: ConfigKey , values: any[]) => {
    expect.assertions(2 * values.length);
    values.forEach((v) => {
      const config: Config = {};
      config[key] = v;
      let logger: PrettyConsole;
      try {
        logger = new PrettyConsole(config);
      }
      catch (err: any) {
        expect(err).instanceOf(Error);
        expect(err.message).toContain(`Type mismatch for config.${key}`);
        //expect(() => logger.setConfig(config)).toThrow(`Type mismatch for config.${key}`);
      }
    });
  };

  it('invalid level', () => {
    checkInvalidProperty('level', [undefined, null, 'hoge',  {no: true}, new Error()]);
  });

  it('invalid timestamp', () => {
    checkInvalidProperty('timestamp', [undefined, null, 'hoge', 0, {yes: true}, new Error()]);
  });

  it('invalid levelName', () => {
    checkInvalidProperty('levelName', [undefined, null, 'hoge', 0, {yes: 'no'}, new Error()]);
  });

  it('invalid callStack', () => {
    checkInvalidProperty('callStack', [undefined, null, 'hoge', 0, {yes: 'no'}, new Error()]);
  });


  it('invalid breakLength', () => {
    checkInvalidProperty('breakLength', [undefined, null, 'hoge', true, {yes: 'no'}, new Error()]);
  });

  it('invalid colors', () => {
    checkInvalidProperty('colors', [undefined, null, 'hoge', {yes: 'no'}, 0, new Error()]);
  });

  it('invalid compact', () => {
    checkInvalidProperty('compact', [undefined, null, 'hoge', {yes: 'no'}, new Error()]);
  });

  it('invalid depth', () => {
    checkInvalidProperty('depth', [undefined, 'hoge', false, {yes: 'no'}, new Error()]);
  });

  it('invalid maxArrayLength', () => {
    checkInvalidProperty('maxArrayLength', [undefined, 'hoge', false, {yes: 'no'}, new Error()]);
  });

  it('invalid maxStringLength', () => {
    checkInvalidProperty('maxStringLength', [undefined, 'hoge', false, {yes: 'no'}, new Error()]);
  });

  it('invalid sorted', () => {
    checkInvalidProperty('sorted', [undefined, null, 'hoge', {yes: 'no'}, 0, new Error()]);
  });

  async function testOutputString(expects: string[], noExpects: string[], ...args: unknown[]) {
    const stream = new MemoryStream()
    const provider = pino(pinoOptions, stream) as unknown as LogProvider;
    provider.log = provider.info; // pino doesn't have `log`.
    const level = pinoLogger.level as string as LogLevel;
    const config: Config = { levelName: false, timestamp: false, level, provider, pretty: false };
    const logger: LogProvider = new PrettyConsole(config);
    logger.info(...args);

    // Empty await to resolve log output latency
    await new Promise((r) => setImmediate(r));

    // Get the output line.
    const line = stream.text().trim().split('\n')[0]

    expects.forEach(s => expect(line).toContain(s));

    noExpects.forEach(s => expect(line).not.toContain(s));
  };

  it('If `pretty` is `false` and inject `pino`, the output up to the second argument is logged via `pino`(object,num1,num2).', async () => {
    const obj = { x: 124, y: "hello" };
    const num1 = 123456;
    const num2 = 0.00099;
    const str = "This is a string.";
    const err = Object.assign(new Error("#ERROR#"), { code: "ETEST" });

    await testOutputString(
      [JSON.stringify(obj).replace('{', '').replace('}', ''), String(num1)], 
      [String(num2)],
      obj, num1, num2);

  });

  it('If `pretty` is `false` and inject `pino`, the output up to the second argument is logged via `pino`(num1,num2,string).', async () => {
    const num1 = 123456;
    const num2 = 0.00099;
    const str = "This is a string.";

    await testOutputString(
      [`"msg":${num1}`],
      [String(num2), str],
      num1, num2, str);

  });

  it('If `pretty` is `false` and inject `pino`, the output up to the second argument is logged via `pino`(error,num2).', async () => {
    const num2 = 0.00099;
    const err = Object.assign(new Error("#ERROR#"), { code: "ETEST" });

    await testOutputString(
      [err.name, err.message, err.code, "code", String(num2)],
      [],
      err, num2); 

  });

  it('If `pretty` is `false` and inject `pino`, the output up to the second argument is logged via `pino`(array,num2).', async () => {
    const num2 = 0.00099;
    const array = [1, 2, 3, 4,];

    await testOutputString(
      [JSON.stringify({...array}).replace('{', '').replace('}', ''), String(num2)],
      [],
      array, num2); 

  });

  it('If `pretty` is `false` and inject `pino`, the output up to the second argument is logged via `pino`(array[err],string).', async () => {
    const str = "This is a string.";
    const err = Object.assign(new Error("#ERROR#"), { code: "ETEST" });
    const array = [err];

    await testOutputString(
      [JSON.stringify({...array}).replace('{', '').replace('}', ''), str],
      [],
      array, str); 

  });

  it('If `pretty` is `false` and inject `pino`, the output up to the second argument is logged via `pino`(object,array).', async () => {
    const obj = { x: 124, y: "hello" };
    const aaa = [1, 2, 3, 4,];

    await testOutputString(
      [JSON.stringify(obj).replace('{', '').replace('}', ''), `"msg":${JSON.stringify(aaa)}`],
      [],
      obj, aaa);
  });

  it('If `pretty` is `false` and inject `pino`, the output up to the second argument is logged via `pino`(object,error).', async () => {
    const obj = { x: 124, y: "hello" };
    const err = Object.assign(new Error("#ERROR#"), { code: "ETEST" });

    await testOutputString(
      [JSON.stringify(obj).replace('{', '').replace('}', ''), `"msg":${JSON.stringify(err)}`],
      [],
      obj, err);
  });

  function testCallback(method: LogMethod) {
    const err = new Error("####");
    const args = ["Hello", 12345, {key: true}, err] as unknown[];
    expect.assertions(7);
    const onLog = (le: LogEntry) => {
      expect(le.method).toBe(method);
      expect(le.timestamp).toBeInstanceOf(Date);
      expect(le.args.length).toBe(args.length);
      args.forEach((arg, i) => expect(le.args[i]).toBe(arg));
    };
    const config: Config = { levelName: false, timestamp: false, level: 'silent', pretty: true, onLog };
    const pretty = new PrettyConsole(config);

    pretty[method](...args);

  }

  it('By setting a callback function in `Config`, you can obtain the appropriate `LogEntry`(log).', () => {
    testCallback('log');
  })
  
  it('By setting a callback function in `Config`, you can obtain the appropriate `LogEntry`(trace).', () => {
    testCallback('trace');
  })

  it('By setting a callback function in `Config`, you can obtain the appropriate `LogEntry`(debug).', () => {
    testCallback('debug');
  })

  it('By setting a callback function in `Config`, you can obtain the appropriate `LogEntry`(info).', () => {
    testCallback('info');
  })

  it('By setting a callback function in `Config`, you can obtain the appropriate `LogEntry`(warn).', () => {
    testCallback('warn');
  })

  it('By setting a callback function in `Config`, you can obtain the appropriate `LogEntry`(error).', () => {
    testCallback('error');
  })

  it('By setting a callback function in `Config`, you can obtain the appropriate `LogEntry`(fatal).', () => {
    testCallback('fatal');
  })

  it('should strip internal library frames from the stack trace', () => {
    let capturedLog = '';
    const logger = new PrettyConsole({
      callStack: true,
      onLog: (entry) => {
        // Get the output stack (or formatted string)
        capturedLog = entry.args.join(' '); 
      }
    });

    logger.trace('Error occurred');

    // Verify that the stack trace does not contain internal library filenames.
    expect(capturedLog).not.toContain('PrettyConsole.ts');
    // Conversely, verify that the information from this test file (user side) is included.
    expect(capturedLog).toContain('PrettyConsole.test.ts'); 
  });

});
