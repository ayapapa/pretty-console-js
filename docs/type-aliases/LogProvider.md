[**@ayapapa-npm/pretty-console-js**](../README.md)

***

[@ayapapa-npm/pretty-console-js](../README.md) / LogProvider

# Type Alias: LogProvider

> **LogProvider** = `Pick`\<`Console`, `"log"` \| `"error"` \| `"warn"` \| `"info"` \| `"debug"` \| `"trace"`\> & `object`

Defined in: [lib/PrettyConsole.ts:28](https://github.com/ayapapa/pretty-console/blob/5cb29799ce6adb11e67fda51ea3cad5f86aa6fde/src/lib/PrettyConsole.ts#L28)

Type of the console replacement object.

`fatal` is optional. If it is not provided, PrettyConsole.fatal()
falls back to the provider's error() method.

## Type Declaration

### fatal?

> `optional` **fatal?**: (...`a`) => `void`

#### Parameters

##### a

...`unknown`[]

#### Returns

`void`
