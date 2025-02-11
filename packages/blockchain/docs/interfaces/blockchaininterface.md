[@ethereumjs/blockchain](../README.md) / BlockchainInterface

# Interface: BlockchainInterface

## Implemented by

- [`Blockchain`](../classes/Blockchain.md)

## Table of contents

### Properties

- [consensus](BlockchainInterface.md#consensus)

### Methods

- [delBlock](BlockchainInterface.md#delblock)
- [getBlock](BlockchainInterface.md#getblock)
- [getCanonicalHeadBlock](BlockchainInterface.md#getcanonicalheadblock)
- [getIteratorHead](BlockchainInterface.md#getiteratorhead)
- [getTotalDifficulty](BlockchainInterface.md#gettotaldifficulty)
- [iterator](BlockchainInterface.md#iterator)
- [putBlock](BlockchainInterface.md#putblock)
- [setIteratorHead](BlockchainInterface.md#setiteratorhead)
- [shallowCopy](BlockchainInterface.md#shallowcopy)
- [validateHeader](BlockchainInterface.md#validateheader)

## Properties

### consensus

• **consensus**: [`Consensus`](Consensus.md)

#### Defined in

[types.ts:9](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L9)

## Methods

### delBlock

▸ **delBlock**(`blockHash`): `Promise`<`void`\>

Deletes a block from the blockchain. All child blocks in the chain are
deleted and any encountered heads are set to the parent block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHash` | `Uint8Array` | The hash of the block to be deleted |

#### Returns

`Promise`<`void`\>

#### Defined in

[types.ts:23](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L23)

___

### getBlock

▸ **getBlock**(`blockId`): `Promise`<`Block`\>

Returns a block by its hash or number.

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | `number` \| `bigint` \| `Uint8Array` |

#### Returns

`Promise`<`Block`\>

#### Defined in

[types.ts:28](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L28)

___

### getCanonicalHeadBlock

▸ **getCanonicalHeadBlock**(): `Promise`<`Block`\>

Returns the latest full block in the canonical chain.

#### Returns

`Promise`<`Block`\>

#### Defined in

[types.ts:81](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L81)

___

### getIteratorHead

▸ **getIteratorHead**(`name?`): `Promise`<`Block`\>

Returns the specified iterator head.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | Optional name of the iterator head (default: 'vm') |

#### Returns

`Promise`<`Block`\>

#### Defined in

[types.ts:63](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L63)

___

### getTotalDifficulty

▸ `Optional` **getTotalDifficulty**(`hash`, `number?`): `Promise`<`bigint`\>

Gets total difficulty for a block specified by hash and number

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `Uint8Array` |
| `number?` | `bigint` |

#### Returns

`Promise`<`bigint`\>

#### Defined in

[types.ts:76](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L76)

___

### iterator

▸ **iterator**(`name`, `onBlock`, `maxBlocks?`, `releaseLockOnCallback?`): `Promise`<`number`\>

Iterates through blocks starting at the specified iterator head and calls
the onBlock function on each block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the state root head |
| `onBlock` | [`OnBlock`](../README.md#onblock) | Function called on each block with params (block: Block, |
| `maxBlocks?` | `number` | optional maximum number of blocks to iterate through reorg: boolean) |
| `releaseLockOnCallback?` | `boolean` | - |

#### Returns

`Promise`<`number`\>

#### Defined in

[types.ts:39](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L39)

___

### putBlock

▸ **putBlock**(`block`): `Promise`<`void`\>

Adds a block to the blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `Block` | The block to be added to the blockchain. |

#### Returns

`Promise`<`void`\>

#### Defined in

[types.ts:15](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L15)

___

### setIteratorHead

▸ **setIteratorHead**(`tag`, `headHash`): `Promise`<`void`\>

Set header hash of a certain `tag`.
When calling the iterator, the iterator will start running the first child block after the header hash currently stored.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag to save the headHash to |
| `headHash` | `Uint8Array` | The head hash to save |

#### Returns

`Promise`<`void`\>

#### Defined in

[types.ts:71](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L71)

___

### shallowCopy

▸ **shallowCopy**(): [`BlockchainInterface`](BlockchainInterface.md)

Returns a shallow copy of the blockchain that may share state with the original

#### Returns

[`BlockchainInterface`](BlockchainInterface.md)

#### Defined in

[types.ts:49](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L49)

___

### validateHeader

▸ **validateHeader**(`header`, `height?`): `Promise`<`void`\>

Validates a block header, throwing if invalid. It is being validated against the reported `parentHash`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | `BlockHeader` | header to be validated |
| `height?` | `bigint` | If this is an uncle header, this is the height of the block that is including it |

#### Returns

`Promise`<`void`\>

#### Defined in

[types.ts:56](https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/blockchain/src/types.ts#L56)
