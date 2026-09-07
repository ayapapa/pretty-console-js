[**@ayapapa-npm/pretty-console-js**](../README.md)

***

[@ayapapa-npm/pretty-console-js](../README.md) / LogEntry

# Interface: LogEntry

Defined in: [lib/PrettyConsole.ts:39](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L39)

LogEntry type

## Properties

### args

> **args**: `unknown`[]

Defined in: [lib/PrettyConsole.ts:52](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L52)

Arguments passed to the logging method.

This array can be modified by the `onLog` callback.
Any changes are reflected in subsequent PrettyConsole processing.

***

### method

> `readonly` **method**: [`LogMethod`](../type-aliases/LogMethod.md)

Defined in: [lib/PrettyConsole.ts:44](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L44)

Logging method.

***

### timestamp

> `readonly` **timestamp**: `Date`

Defined in: [lib/PrettyConsole.ts:41](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L41)

Log output time.
