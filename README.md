[![CI](https://github.com/ayapapa/pretty-console/actions/workflows/ci.yml/badge.svg)](https://github.com/ayapapa/pretty-console/actions/workflows/ci.yml)

# pretty-console-js

## Table of contents
[Overview](#overview) | [Why?](#why) | [Features](#features) | [Installation](#installation) | [List of APIs](#list-of-apis) | [Configurations](#configurations) | [Node.js Support](#nodejs-support) | [Usage](#usage) | [Examples](#examples)

## Overview
A tiny wrapper around the standard Node.js `console`.

PrettyConsole is a small utility that makes console log output a little more readable.<br>
For example, `console.info()` produces output like this:
```
{
  jjj: true,
  iii: 123,
  hhh: 'hello',
  next: { ggg: 'goodbye', ddd: 'yesterday', yyy: 1998.092 }
}
```
With `PrettyConsole.info()`, you can get output like this:
```
[2026-08-28 18:12:28.243] INFO: {
  hhh: 'hello',
  iii: 123,
  jjj: true,
  next: {
    ddd: 'yesterday',
    ggg: 'goodbye',
    yyy: 1998.092
  }
}
```
**You can specify settings such as sorting by key, object expansion, adding timestamps, and assigning log levels.**

A logger that is compatible with the console API can be injected directly. 

Loggers that are not compatible with the console API can also be integrated with some adaptation. For more flexible integration, use the onLog callback to receive each log entry and forward it to your logger as needed.

Examples of these integration approaches are available in the [Examples](#examples) section. See [`Config`](#configurations) for configuration details.


**As a result, console logs can be made more readable by humans, file logs can be made more readable by machines, and so on.**


## Why?

While developing Node.js libraries, I found myself using `console` for most debugging tasks because it is simple and always available. However, I often wanted a few extra features without introducing a full-featured logging framework.

So I created **pretty-console**.

It keeps the familiar `console` API while adding a few small conveniences for everyday development.

Furthermore, as debugging tasks grew more complex—involving elements such as file I/O, 
mutual exclusion, and asynchronous processing—I keenly felt the need for a logger capable of writing to files.

To address this, I also added functionality to integrate with a standard file logger.

## Features

* Deeply nested objects are displayed using [`util.inspect()`](https://nodejs.org/api/util.html#utilinspectobject-options).
* By setting `sorted` to `true`, object entries are sorted by key name.
* Supports configurable log levels (`'trace'`, `'debug'`, `'info'`, `'warn'`, `'error'`, `'fatal'`, and `'silent'`).
* Optional timestamps.
* Optional colored output.
* Configurable formatting options.
* Optional console-compatible external logger injection. 
* Optional callback function to receive arguments to be passed console. It is convenient to integrate with a file logger.

**As a result, console logs can be made more readable by humans, file logs can be made more readable by machines, and so on.**


The goal is **not** to replace logging frameworks such as [Pino](https://www.npmjs.com/package/pino) or [Winston](https://www.npmjs.com/package/winston), but to make the built-in `console` more pleasant to use during development. <br>


## Installation

```bash
npm install @ayapapa-npm/pretty-console-js
```

## List of APIs
```
PrettyConsole
├── log():              Outputs if level specified other than `silent`.
├── trace():            Outputs `trace` level log.
├── debug():            Outputs `debug` level log.
├── info():             Outputs `info` level log.
├── warn():             Outputs `warn` level log.
├── error():            Outputs `error` level log.
├── fatal():            Outputs `fatal` level log.
├── setConfig():        Update the current configuration with the specified options.
├── getConfig():        Get the current settings.
├── resetConfig():      Reset settings (return to default settings).
└── getDefaultConfig(): Get the default settings.
```

## Configurations
Set the output configuration using `PrettyConsole.setConfig()`.

Key configuration options.
The `breakLength` option and what follows are options that are passed directly 
to the Configuration Options of [`util.inspect()`](https://nodejs.org/api/util.html#utilinspectobject-options). You can also specify 
Configuration Options for util.inspect() that are not described here. 
For more information, see the description of 
[`util.inspect()` Configuration Options](https://nodejs.org/api/util.html#utilinspectobject-options).

| Option        | Type      | Default       | Description      |
| ------------- | --------- | ------------- | ---------------- |
| `level`       | `string` | `'info'`      | The minimum log level to display. Valid values: `'trace'`, `'debug'`, `'info'`, `'warn'`, `'error'`, `'fatal'`, and `'silent'`. Order: `'trace'` < `'debug'` < `'info'` < `'warn'` < `'error'` < `'fatal'` < `'silent'` |
| `timestamp`   | `boolean` | `true` | If `true`, includes a timestamp in the output. |
| `levelName`   | `boolean` | `true` | If `true`, includes the log level name (e.g., TRACE, DEBUG). |
| `callStack`   | `boolean` | `false` | If `true`, includes the call stack for `trace`-level logs. This is an option for `console.trace()` compatibility; therefore, it applies only to logs at the `trace` level. |
| `provider`    | `LogProvider` | `console` | Specifies alternative to `console`. |
| `pretty`      | `boolean` | `true` | If `true`, uses PrettyConsole's `pretty` output.          |
| `onLog`       | `(logEntry: LogEntry) => void` | `undefined` | A callback function that receives each log call before level filtering and formatting. The callback may modify LogEntry.args, and any changes are reflected in subsequent PrettyConsole processing. |
| `breakLength` | `number`  | `120` | The length at which input values are split across multiple lines. Set to Infinity to format the input as a single line (in combination with compact set to true or any number >= 1). |
| `colors`      | `boolean` | `true` | If `true`, the output is styled with ANSI color codes. Colors are customizable. See [Customizing util.inspect colors](https://nodejs.org/api/util.html#customizing-utilinspect-colors). |
| `compact`     | `boolean` or `number` | `false` | If `false`, each object key is displayed on a new line, and text longer than `breakLength` is broken. If a number is specified, up to `n` inner elements are combined on a single line if they fit within `breakLength`. Short array elements are also grouped. |
| `depth` | `number` or `null` | `null` | Sets the maximum recursion depth for nested objects. Use `null` to inspect all levels. |
| `maxArrayLength` | `number` or `null` | `100` | Sets the maximum number of Array, TypedArray, Map, WeakMap, and WeakSet elements to include. Use `null` or `Infinity` to show all elements. Use `0` or a negative number to show no elements. |
| `maxStringLength` | `number` or `null` | `12800` | Sets the maximum number of characters to include when formatting. Use `null` or `Infinity` to show all characters. Use `0` or a negative number to show no characters. |
| `sorted`      | `boolean` or `function` | `true` | If `true` or a function, all properties of an object, and Set and Map entries are sorted in the resulting string. If `true`, the [default sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) is used. If a function is provided, it is used as a [compare function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters). |

### `onLog` callback

The `onLog` callback receives every log entry **before console-level filtering and output formatting are applied**.

This allows the console output level and the external logger level to be controlled independently.

For example, with `level: 'warn'`:

* `debug()` is not displayed on the console.
* `debug()` is still passed to `onLog`.
* `warn()` is displayed on the console and passed to `onLog`.

This makes `onLog` useful for forwarding logs to external logging systems, files, monitoring services, or other log processing pipelines.

## Node.js Support

PrettyConsole supports actively maintained LTS versions of Node.js.

We aim to support the latest LTS versions and maintain compatibility with
older LTS versions where reasonably possible.

Current support is tested in CI against:

- Node.js 20.x
- Node.js 22.x
- Node.js 24.x

Non-LTS versions may work, but they are not officially supported.

## Usage

```javascript
import { PrettyConsole } from '@ayapapa-npm/pretty-console-js';
// CommonJS:
// const { PrettyConsole } = require('@ayapapa-npm/pretty-console-js');

// Create instance
const logger = new PrettyConsole({ level: 'trace', callStack: true });

function someFunc(x, y, z) {
  logger.trace('enter someFunc', 'args: ', 'x =', x, 'y =', y, 'z =', z);

  const obj = { jjj: true, iii: 123, hhh: 'hello', next: { ggg: "goodbye", ddd: "yesterday", yyy: 1998.092 } };
  logger.info(obj);

  const result = x * y - z;
  logger.debug("result =", result);

  try {
    throw new Error("Error!!");
  }
  catch (err) {
    logger.error("Error occurred.", err);
  }

  return result;
}

function main() {
  const res = someFunc(1, 2, 3);
  logger.log("someFunc() returns:", res);
}

main();
```
Execution results:<br>
![Execution results](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/images/usage1.png)

## Examples

| File        | Type      | Description        | 
| ----------- | --------- | ------------------ |
| [example/pretty1.cjs](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pretty1.cjs) | CommonJS   | A simple example |
| [example/pretty1.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pretty1.ts)  | TypeScript | A simple example |
| [example/logger-injection.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/logger-injection.ts) | TypeScript   | An example of type-safe external logger injection.  |
| [example/pino-integration1.cjs](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pino-integration1.cjs) | CommonJS   | An example of receiving log output information via the `onLog` callback and outputting it using `pino`. |
| [example/pino-integration1.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pino-integration1.ts)  | TypeScript | An example of receiving log output information via the `onLog` callback and outputting it using `pino`. |
| [example/pino-integration2.cjs](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pino-integration2.cjs) | CommonJS   | An example showing how to receive log output information via the `onLog` callback and include `Error` instance details in the log when outputting using `pino`. |
| [example/pino-integration2.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pino-integration2.ts)  | TypeScript | An example showing how to receive log output information via the `onLog` callback and include `Error` instance details in the log when outputting using `pino`. |
| [example/pino-integration3.cjs](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pino-integration3.cjs) | CommonJS   | An example of outputting to the console using `PrettyConsole` while simultaneously outputting to a file using `pino`. |
| [example/pino-integration3.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/pino-integration3.ts)  | TypeScript | An example of outputting to the console using `PrettyConsole` while simultaneously outputting to a file using `pino`. |
| [example/winston-integration1.cjs](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/winston-integration1.cjs) | CommonJS   | An example of receiving log output information via the `onLog` callback and outputting it using `winston`. |
| [example/winston-integration1.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/winston-integration1.ts)  | TypeScript | An example of receiving log output information via the `onLog` callback and outputting it using `winston`. |
| [example/winston-integration2.cjs](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/winston-integration2.cjs) | CommonJS   | An example showing how to receive log output information via the `onLog` callback and include `Error` instance details in the log when outputting using `winston`. |
| [example/winston-integration2.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/winston-integration2.ts)  | TypeScript | An example showing how to receive log output information via the `onLog` callback and include `Error` instance details in the log when outputting using `winston`. |
| [example/winston-integration3.cjs](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/winston-integration3.cjs) | CommonJS   | An example of outputting to the console using `PrettyConsole` while simultaneously outputting to a file using `winston`. |
| [example/winston-integration3.ts](https://raw.githubusercontent.com/ayapapa/pretty-console-js/main/example/winston-integration3.ts)  | TypeScript | An example of outputting to the console using `PrettyConsole` while simultaneously outputting to a file using `winston`. |
