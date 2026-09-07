[**@ayapapa-npm/pretty-console-js**](../README.md)

***

[@ayapapa-npm/pretty-console-js](../README.md) / LogProvider

# Type Alias: LogProvider

> **LogProvider** = `Pick`\<`Console`, `"log"` \| `"error"` \| `"warn"` \| `"info"` \| `"debug"` \| `"trace"`\> & `object`

Defined in: [lib/PrettyConsole.ts:28](https://github.com/ayapapa/pretty-console/blob/312d8faa5837375b39a1fd3234a99c3d01569712/src/lib/PrettyConsole.ts#L28)

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
