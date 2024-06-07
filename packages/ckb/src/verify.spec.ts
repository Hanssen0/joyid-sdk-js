/* eslint-disable camelcase */
import { describe, it, expect } from 'vitest'
import { verifyCredential, verifySignature } from './verify'
import r1_main_session_key_sign from '../fixtures/r1_main_session_key_sign.json'
import r1_mainkey_sign from '../fixtures/r1_mainkey_sign.json'
import r1_sub_session_key_sign from '../fixtures/r1_sub_session_key_sign.json'
import r1_subkey_sign from '../fixtures/r1_subkey_sign.json'
import rsa_main_session_key_sign from '../fixtures/rsa_main_session_key_sign.json'
import rsa_mainkey_sign from '../fixtures/rsa_mainkey_sign.json'
import rsa_sub_session_key_sign from '../fixtures/rsa_sub_session_key_sign.json'
import rsa_subkey_sign from '../fixtures/rsa_subkey_sign.json'
import r1_main_session_key_sign_credential from '../fixtures/r1_main_session_key_auth.json'
import r1_mainkey_sign_credential from '../fixtures/r1_mainkey_auth.json'
import r1_sub_session_key_sign_credential from '../fixtures/r1_sub_session_key_auth.json'
import r1_subkey_sign_credential from '../fixtures/r1_subkey_auth.json'
import rsa_main_session_key_sign_credential from '../fixtures/rsa_main_session_key_auth.json'
import rsa_mainkey_sign_credential from '../fixtures/rsa_mainkey_auth.json'
import rsa_sub_session_key_sign_credential from '../fixtures/rsa_sub_session_key_auth.json'
import rsa_subkey_sign_credential from '../fixtures/rsa_subkey_auth.json'

describe('verify', () => {
  describe('verifySignature', () => {
    it('r1_main_session_key_sign', async () => {
      const res = await verifySignature(r1_main_session_key_sign as any)
      expect(res).toBe(true)
    })

    it('r1_mainkey_sign', async () => {
      const res = await verifySignature(r1_mainkey_sign as any)
      expect(res).toBe(true)
    })

    it('r1_sub_session_key_sign', async () => {
      const res = await verifySignature(r1_sub_session_key_sign as any)
      expect(res).toBe(true)
    })

    it('r1_subkey_sign', async () => {
      const res = await verifySignature(r1_subkey_sign as any)
      expect(res).toBe(true)
    })

    it('rsa_main_session_key_sign', async () => {
      const res = await verifySignature(rsa_main_session_key_sign as any)
      expect(res).toBe(true)
    })

    it('rsa_mainkey_sign', async () => {
      const res = await verifySignature(rsa_mainkey_sign as any)
      expect(res).toBe(true)
    })

    it('rsa_sub_session_key_sign', async () => {
      const res = await verifySignature(rsa_sub_session_key_sign as any)
      expect(res).toBe(true)
    })

    it('rsa_subkey_sign', async () => {
      const res = await verifySignature(rsa_subkey_sign as any)
      expect(res).toBe(true)
    })

    it('r1_main_session_key_sign with wrong pubkey', async () => {
      const res = await verifySignature({
        ...r1_main_session_key_sign,
        pubkey: 'wrong pubkey',
      } as any)
      expect(res).toBe(false)
    })
  })

  describe.skip('verifyCredential', () => {
    it.skip('r1_main_session_key_auth', async () => {
      const { address, pubkey, keyType, alg } =
        r1_main_session_key_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it('r1_mainkey_auth', async () => {
      const { address, pubkey, keyType, alg } = r1_mainkey_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it.skip('r1_sub_session_key_auth', async () => {
      const { address, pubkey, keyType, alg } =
        r1_sub_session_key_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it('r1_subkey_auth', async () => {
      const { address, pubkey, keyType, alg } = r1_subkey_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it.skip('rsa_main_session_key_auth', async () => {
      const { address, pubkey, keyType, alg } =
        rsa_main_session_key_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it('rsa_mainkey_auth', async () => {
      const { address, pubkey, keyType, alg } = rsa_mainkey_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it.skip('rsa_sub_session_key_auth', async () => {
      const { address, pubkey, keyType, alg } =
        rsa_sub_session_key_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it('rsa_subkey_auth', async () => {
      const { address, pubkey, keyType, alg } = rsa_subkey_sign_credential
      const res = await verifyCredential(pubkey, address, keyType as any, alg)
      expect(res).toBe(true)
    })

    it('r1_mainkey_auth with wrong pubkey', async () => {
      const { address, keyType, alg } = r1_mainkey_sign_credential
      const res = await verifyCredential(
        '0x1234567890123456789012345678901234567890',
        address,
        keyType as any,
        alg
      )
      expect(res).toBe(false)
    })
  })
})