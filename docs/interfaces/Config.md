[**@ayapapa-npm/pretty-console-js**](../README.md)

***

[@ayapapa-npm/pretty-console-js](../README.md) / Config

# Interface: Config

Defined in: [lib/PrettyConsole.ts:63](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L63)

configuration definition. 
The 'breakLength' option and what follows are options that are passed directly
to the Configuration Options of util.inspect(). You can also specify 
Configuration Options for util.inspect() that are not described here.
For more information, see the description of
[util.inspect() Configuration Options](https://nodejs.org/api/util.html#utilinspectobject-options).

## Properties

### breakLength?

> `optional` **breakLength?**: `number`

Defined in: [lib/PrettyConsole.ts:134](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L134)

Specifies the length at which input values are split across multiple lines.
Set to Infinity to format the input as a single line
(in combination with compact set to true or any number >= 1).
If omitted, default to `120`.

#### Default

```ts
120
```

***

### callStack?

> `optional` **callStack?**: `boolean`

Defined in: [lib/PrettyConsole.ts:105](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L105)

Whether to output the call stack in `trace()`. 
If set to `true`, the call stack is added to `trace`-level logs. 
Note: This applies only to `trace`-level logs.
If omitted, defaults to `false`.

#### Default

```ts
false
```

***

### colors?

> `optional` **colors?**: `boolean`

Defined in: [lib/PrettyConsole.ts:143](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L143)

Whether to color the output. 
If set to `true`, the output is styled with ANSI color codes.
Colors are customizable. See [Customizing util.inspect colors](https://nodejs.org/api/util.html#customizing-utilinspect-colors). 
If omitted, default to `true`.

#### Default

```ts
true
```

***

### compact?

> `optional` **compact?**: `number` \| `boolean`

Defined in: [lib/PrettyConsole.ts:155](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L155)

Whether to make the object output compact.
Setting this to false causes each object key to be displayed on a new line.
It will break on new lines in text that is longer than breakLength.
If set to a number, the most n inner elements are united on a single line
as long as all properties fit into breakLength.
Short array elements are also grouped together.
If omitted, default to `false`.

#### Default

```ts
false
```

***

### depth?

> `optional` **depth?**: `number` \| `null`

Defined in: [lib/PrettyConsole.ts:163](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L163)

Specifies the maximum recursion depth for nested objects.
Use null to inspect all levels recursively.
If omitted, default to `null`.

#### Default

```ts
null
```

***

### level?

> `optional` **level?**: `"silent"` \| `"error"` \| `"log"` \| `"warn"` \| `"info"` \| `"debug"` \| `"trace"` \| `"fatal"`

Defined in: [lib/PrettyConsole.ts:77](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L77)

Desired logging level. 
In order of priority, available levels are:
 - 'trace':  Output logs for all levels.
 - 'debug':  Output logs for 'debug' and higher levels.
 - 'info':   Output logs for 'info' and higher levels.
 - 'warn':   Output logs for 'warn' and higher levels.
 - 'error':  Output logs for 'error' and 'fatal' levels.
 - 'fatal':  Output logs only for the 'fatal' level.
 - 'silent': No output logs.
If omitted, defaults to `'info'`.

#### Default

```ts
'info'
```

***

### levelName?

> `optional` **levelName?**: `boolean`

Defined in: [lib/PrettyConsole.ts:96](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L96)

Whether to output logging level name. 
If set to `true`, the log level name is output.
For each call to `trace()`, `debug()`, `info()`, `warn()`, `error()`, and `fatal()`, 
the corresponding `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, and `FATAL` is output.
Since `log()` is level-agnostic, the `Level Name` is not output when `log()` is used.
If omitted, defaults to `true`.

#### Default

```ts
true
```

***

### maxArrayLength?

> `optional` **maxArrayLength?**: `number` \| `null`

Defined in: [lib/PrettyConsole.ts:174](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L174)

Specifies the maximum number of Array, TypedArray, Map, WeakMap, and WeakSet
elements to include when formatting. Set to null or Infinity to show all elements.
Set to 0 or negative to show no elements. 
For more information, see the description of
[util.inspect() Configuration Options](https://nodejs.org/api/util.html#utilinspectobject-options).
If omitted, default to `100`.

#### Default

```ts
100
```

***

### maxStringLength?

> `optional` **maxStringLength?**: `number` \| `null`

Defined in: [lib/PrettyConsole.ts:183](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L183)

Specifies the maximum number of characters to include when formatting.
Set to null or Infinity to show all elements.
Set to 0 or negative to show no characters.
If omitted, default to `12800`.

#### Default

```ts
12800
```

***

### onLog?

> `optional` **onLog?**: (`logEntry`) => `void`

Defined in: [lib/PrettyConsole.ts:125](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L125)

A callback function that receives each log call before level filtering and formatting.

#### Parameters

##### logEntry

[`LogEntry`](LogEntry.md)

#### Returns

`void`

#### Default

```ts
undefined
```

***

### pretty?

> `optional` **pretty?**: `boolean`

Defined in: [lib/PrettyConsole.ts:119](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L119)

Whether or not to use PrettyConsole's `pretty` output.
If omitted, `pretty` is `true`.

#### Default

```ts
true
```

***

### provider?

> `optional` **provider?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/PrettyConsole.ts:112](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L112)

Alternative to `console`.
If omitted, `console` is used.

#### Default

```ts
console
```

***

### sorted?

> `optional` **sorted?**: `boolean` \| [`CompareFn`](../type-aliases/CompareFn.md)

Defined in: [lib/PrettyConsole.ts:194](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L194)

If set to `true` or a `function`, all properties of an object,
and Set and Map entries are sorted in the resulting string.
If set to `true`, the [default sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
is used. If set to a function, it is used as a
[compare function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters).
If omitted, default to `true`.

#### Default

```ts
true
```

***

### timestamp?

> `optional` **timestamp?**: `boolean`

Defined in: [lib/PrettyConsole.ts:85](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L85)

Whether to output timestamps. 
If set to `true`, the timestamp is output.
If omitted, defaults to `true`.

#### Default

```ts
true
```
