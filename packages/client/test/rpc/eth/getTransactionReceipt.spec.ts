import { Common, Hardfork } from '@ethereumjs/common'
import {
  BlobEIP4844Transaction,
  FeeMarketEIP1559Transaction,
  LegacyTransaction,
} from '@ethereumjs/tx'
import {
  blobsToCommitments,
  bytesToHex,
  commitmentsToVersionedHashes,
  getBlobs,
  initKZG,
  randomBytes,
} from '@ethereumjs/util'
import * as kzg from 'c-kzg'
import { assert, describe, it } from 'vitest'

import pow from '../../testdata/geth-genesis/pow.json'
import {
  baseRequest,
  dummy,
  gethGenesisStartLondon,
  params,
  runBlockWithTxs,
  setupChain,
} from '../helpers'

const method = 'eth_getTransactionReceipt'

describe(method, () => {
  it('call with legacy tx', async () => {
    const { chain, common, execution, server } = await setupChain(pow, 'pow')

    // construct tx
    const tx = LegacyTransaction.fromTxData(
      {
        gasLimit: 2000000,
        gasPrice: 100,
        to: '0x0000000000000000000000000000000000000000',
      },
      { common }
    ).sign(dummy.privKey)

    await runBlockWithTxs(chain, execution, [tx])

    // get the tx
    const req = params(method, [bytesToHex(tx.hash())])
    const expectRes = (res: any) => {
      const msg = 'should return the correct tx'
      assert.equal(res.body.result.transactionHash, bytesToHex(tx.hash()), msg)
    }
    await baseRequest(server, req, 200, expectRes)
  })

  it('call with 1559 tx', async () => {
    const { chain, common, execution, server } = await setupChain(
      gethGenesisStartLondon(pow),
      'powLondon'
    )

    // construct tx
    const tx = FeeMarketEIP1559Transaction.fromTxData(
      {
        gasLimit: 2000000,
        maxFeePerGas: 975000000,
        maxPriorityFeePerGas: 10,
        to: '0x1230000000000000000000000000000000000321',
      },
      { common }
    ).sign(dummy.privKey)

    await runBlockWithTxs(chain, execution, [tx])

    // get the tx
    const req = params(method, [bytesToHex(tx.hash())])
    const expectRes = (res: any) => {
      const msg = 'should return the correct tx'
      assert.equal(res.body.result.transactionHash, bytesToHex(tx.hash()), msg)
    }
    await baseRequest(server, req, 200, expectRes)
  })

  it('call with unknown tx hash', async () => {
    const { server } = await setupChain(pow, 'pow')

    // get a random tx hash
    const req = params(method, [
      '0x89ea5b54111befb936851660a72b686a21bc2fc4889a9a308196ff99d08925a0',
    ])
    const expectRes = (res: any) => {
      const msg = 'should return null'
      assert.equal(res.body.result, null, msg)
    }
    await baseRequest(server, req, 200, expectRes)
  })

  it('get blobGasUsed/blobGasPrice in blob tx receipt', async () => {
    const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')
    if (isBrowser() === true) {
      assert.ok(true)
    } else {
      try {
        // Verified KZG is loaded correctly -- NOOP if throws
        initKZG(kzg, __dirname + '/../../../src/trustedSetups/devnet6.txt')
        //eslint-disable-next-line
      } catch {}
      const gethGenesis = require('../../../../block/test/testdata/4844-hardfork.json')
      const common = Common.fromGethGenesis(gethGenesis, {
        chain: 'customChain',
        hardfork: Hardfork.Cancun,
      })
      const { chain, execution, server } = await setupChain(gethGenesis, 'customChain')
      common.setHardfork(Hardfork.Cancun)

      const blobs = getBlobs('hello world')
      const commitments = blobsToCommitments(blobs)
      const versionedHashes = commitmentsToVersionedHashes(commitments)
      const proofs = blobs.map((blob, ctx) => kzg.computeBlobKzgProof(blob, commitments[ctx]))
      const tx = BlobEIP4844Transaction.fromTxData(
        {
          versionedHashes,
          blobs,
          kzgCommitments: commitments,
          kzgProofs: proofs,
          maxFeePerBlobGas: 1000000n,
          gasLimit: 0xffffn,
          maxFeePerGas: 10000000n,
          maxPriorityFeePerGas: 1000000n,
          to: randomBytes(20),
          nonce: 0n,
        },
        { common }
      ).sign(dummy.privKey)

      await runBlockWithTxs(chain, execution, [tx], true)

      const req = params(method, [bytesToHex(tx.hash())])
      const expectRes = (res: any) => {
        assert.equal(res.body.result.blobGasUsed, '0x20000', 'receipt has correct blob gas usage')
        assert.equal(res.body.result.blobGasPrice, '0x1', 'receipt has correct blob gas price')
      }

      await baseRequest(server, req, 200, expectRes)
    }
  })
})
