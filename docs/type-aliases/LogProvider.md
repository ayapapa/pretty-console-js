[**@ayapapa-npm/pretty-console-js**](../api.md)

***

[@ayapapa-npm/pretty-console-js](../api.md) / LogProvider

# Type Alias: LogProvider

> **LogProvider** = `Pick`\<`Console`, `"log"` \| `"error"` \| `"warn"` \| `"info"` \| `"debug"` \| `"trace"`\> & `object`

Defined in: [lib/PrettyConsole.ts:28](https://github.com/ayapapa/pretty-console/blob/28f7ae86cb0399fbb088294716dc891e572edcde/src/lib/PrettyConsole.ts#L28)

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
