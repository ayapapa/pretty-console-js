[**@ayapapa-npm/pretty-console-js**](../README.md)

***

[@ayapapa-npm/pretty-console-js](../README.md) / PrettyConsole

# Class: PrettyConsole

Defined in: [lib/PrettyConsole.ts:228](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L228)

PrettyConsole, that is a tiny wrapper around the standard Node.js console.

### Why?

While developing Node.js libraries, I found myself using console for most debugging tasks
because it is simple and always available. However, I often wanted a few extra features
without introducing a full-featured logging framework.

So I created pretty-console.

It keeps the familiar console API while adding a few small conveniences for everyday development.

However, debugging tasks such as file I/O, mutual exclusion, and asynchronous processing became complex, 
and I found myself wanting a logger capable of writing to a file.
For this reason, decided to include functionality to integrate with a standard file logger.
 
### Features

- Displays deeply nested objects using `util.inspect()`.
- Supports configurable log levels (`'trace'`, `'debug'`, `'info'`, `'warn'`, `'error'`, `'fatal'`, and `'silent'`).
- Optional timestamps.
- Optional colored output.
- Configurable formatting options.
- Optional console-compatible external logger injection.
- Optional callback function to receive each log call before formatting. It is convenient when integrating with a file logger.
 
The goal is not to replace logging frameworks such as [Pino](https://www.npmjs.com/package/pino) or [Winston](https://www.npmjs.com/package/winston), but to make the built-in console more pleasant to use during development.

## Constructors

### Constructor

> **new PrettyConsole**(`config?`): `PrettyConsole`

Defined in: [lib/PrettyConsole.ts:299](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L299)

Creates a PrettyConsole instance.

#### Parameters

##### config?

[`Config`](../interfaces/Config.md) = `PrettyConsole.#defaultConf`

Initial configuration.

#### Returns

`PrettyConsole`

#### Default

`PrettyConsole.#defaultConf`

## Methods

### debug()

> **debug**(...`args`): `void`

Defined in: [lib/PrettyConsole.ts:364](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L364)

Output information at the 'debug' level.

#### Parameters

##### args

...`unknown`[]

An array of values ​​to be output.

#### Returns

`void`

***

### error()

> **error**(...`args`): `void`

Defined in: [lib/PrettyConsole.ts:388](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L388)

Output information at the 'error' level.

#### Parameters

##### args

...`unknown`[]

An array of values ​​to be output.

#### Returns

`void`

***

### fatal()

> **fatal**(...`args`): `void`

Defined in: [lib/PrettyConsole.ts:396](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L396)

Output information at the 'fatal' level.

#### Parameters

##### args

...`unknown`[]

An array of values ​​to be output.

#### Returns

`void`

***

### getConfig()

> **getConfig**(): `Required`\<[`Config`](../interfaces/Config.md)\>

Defined in: [lib/PrettyConsole.ts:318](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L318)

Get current configuration.

#### Returns

`Required`\<[`Config`](../interfaces/Config.md)\>

Current configuration.

***

### getDefaultConfig()

> **getDefaultConfig**(): [`Config`](../interfaces/Config.md)

Defined in: [lib/PrettyConsole.ts:333](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L333)

Get default configuration.

#### Returns

[`Config`](../interfaces/Config.md)

Default configuration.

***

### info()

> **info**(...`args`): `void`

Defined in: [lib/PrettyConsole.ts:372](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L372)

Output information at the 'info' level.

#### Parameters

##### args

...`unknown`[]

An array of values ​​to be output.

#### Returns

`void`

***

### log()

> **log**(...`args`): `void`

Defined in: [lib/PrettyConsole.ts:341](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L341)

Output information without a level name. No output is produced when the configured level is `silent`.

#### Parameters

##### args

...`unknown`[]

An array of values ​​to be output.

#### Returns

`void`

***

### resetConfig()

> **resetConfig**(): `void`

Defined in: [lib/PrettyConsole.ts:325](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L325)

Reset the current configuration to the default configuration.

#### Returns

`void`

***

### setConfig()

> **setConfig**(`config`): `void`

Defined in: [lib/PrettyConsole.ts:309](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L309)

Update the current configuration with the specified options.
Unspecified options retain their current values.

#### Parameters

##### config

[`Config`](../interfaces/Config.md)

Configuration options to update.

#### Returns

`void`

***

### trace()

> **trace**(...`args`): `void`

Defined in: [lib/PrettyConsole.ts:350](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L350)

Output information at the 'trace' level.
If 'callStack' is true, the call stack is also output.

#### Parameters

##### args

...`unknown`[]

An array of values ​​to be output.

#### Returns

`void`

***

### warn()

> **warn**(...`args`): `void`

Defined in: [lib/PrettyConsole.ts:380](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L380)

Output information at the 'warn' level.

#### Parameters

##### args

...`unknown`[]

An array of values ​​to be output.

#### Returns

`void`

***

### getDefaultConfig()

> `static` **getDefaultConfig**(): [`Config`](../interfaces/Config.md)

Defined in: [lib/PrettyConsole.ts:269](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L269)

Get default configuration.

#### Returns

[`Config`](../interfaces/Config.md)

Default configuration.
