# Node Encryption / Decryption example

An example script to show how to encrypt & decrypt text using the [Node Crypto module](https://nodejs.org/api/crypto.html)

## Arguments

- `algorithm=` - if not passed will default to `aes-256-cbc`. Different algorithms (`aes-128-ecb` for example) will require different `key` & `iv` lengths so they will need to be passed appropriately.
- `key=` - the encryption key, if not passed the script will make one with `crypto.randomBytes(32)`
- `iv=` - the initialisation vector, if not passed the script will make one with `crypto.randomBytes(16)`
- `text=` - the plaintext or cipher text which will be encrypted or decrypted

## Encrypt

To encrypt:

```bash
npm run encrypt
```

Will in turn run:

```bash
node crypto.js method=encrypt text=EPSTEIN-DID-NOT-KILL-HIMSELF
```

Outputs:

```bash
Key: 9c619c24e7c7600d91268298488a70df5e5a9b2b7cfaecae798d6ac8e9e24312
Initialisation Vector: 7cdc3b416ac7950c400b28cca4389327
Text: EPSTEIN-DID-NOT-KILL-HIMSELF
Method: encrypt
Encrypted data: 18e051e9d565bfef472e5c60cbe31e4766ef489e8c53756001dde8b61cacdbf0
```

## Decrypt

To encrypt:

```bash
npm run decrypt
```

Will in turn run:

```bash
node crypto.js method=decrypt key=9c619c24e7c7600d91268298488a70df5e5a9b2b7cfaecae798d6ac8e9e24312 iv=7cdc3b416ac7950c400b28cca4389327 text=18e051e9d565bfef472e5c60cbe31e4766ef489e8c53756001dde8b61cacdbf0
```

Outputs:

```bash
Key: 9c619c24e7c7600d91268298488a70df5e5a9b2b7cfaecae798d6ac8e9e24312
Initialisation Vector: 7cdc3b416ac7950c400b28cca4389327
Text: 18e051e9d565bfef472e5c60cbe31e4766ef489e8c53756001dde8b61cacdbf0
Method: decrypt
Decrypted data: EPSTEIN-DID-NOT-KILL-HIMSELF
```
