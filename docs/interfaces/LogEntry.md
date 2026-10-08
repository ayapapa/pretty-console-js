[**@ayapapa-npm/pretty-console-js**](../api.md)

***

[@ayapapa-npm/pretty-console-js](../api.md) / LogEntry

# Interface: LogEntry

Defined in: [lib/PrettyConsole.ts:39](https://github.com/ayapapa/pretty-console/blob/28f7ae86cb0399fbb088294716dc891e572edcde/src/lib/PrettyConsole.ts#L39)

LogEntry type

## Properties

### args

> **args**: `unknown`[]

Defined in: [lib/PrettyConsole.ts:52](https://github.com/ayapapa/pretty-console/blob/28f7ae86cb0399fbb088294716dc891e572edcde/src/lib/PrettyConsole.ts#L52)

Arguments passed to the logging method.

This array can be modified by the `onLog` callback.
Any changes are reflected in subsequent PrettyConsole processing.

***

### method

> `readonly` **method**: [`LogMethod`](../type-aliases/LogMethod.md)

Defined in: [lib/PrettyConsole.ts:44](https://github.com/ayapapa/pretty-console/blob/28f7ae86cb0399fbb088294716dc891e572edcde/src/lib/PrettyConsole.ts#L44)

Logging method.

***

### timestamp

> `readonly` **timestamp**: `Date`

Defined in: [lib/PrettyConsole.ts:41](https://github.com/ayapapa/pretty-console/blob/28f7ae86cb0399fbb088294716dc891e572edcde/src/lib/PrettyConsole.ts#L41)

Log output time.
