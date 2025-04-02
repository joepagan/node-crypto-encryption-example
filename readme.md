# Node Crypto Encryption Example

An example script to show how to encrypt & decrypt using the Node Crypto module.

## Prerequisites

- Node.js v23.11.0 or higher
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/joepagan/node-crypto-encryption-example.git
cd node-crypto-encryption-example
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Basic Encryption/Decryption

To encrypt text:
```bash
npm run encrypt text="Your text to encrypt"
```

To decrypt text:
```bash
npm run decrypt key="your-key" iv="your-iv" text="encrypted-text"
```

### File-Based Encryption/Decryption

To encrypt text and save it to a file:
```bash
npm run encrypt-file text="Your secret message" outputFile="secret.json"
```

This will:
- Generate a secure random key and IV
- Encrypt your text
- Save it to the specified file (defaults to 'encrypted.json')
- Display the key that you'll need for decryption
- Store the IV and algorithm information in the file

To decrypt text from a file:
```bash
npm run decrypt-file inputFile="secret.json" key="your-key-from-encryption"
```

This will:
- Read the encrypted file
- Use the provided key to decrypt the content
- Display the decrypted text

## Example

1. Encrypt text to a file:
```bash
npm run encrypt-file text="This is a secret message" outputFile="secret.json"
```

2. The script will output the key - save this!
```
Algorithm: aes-256-cbc
Key: 1234... (save this key!)
Initialisation Vector: 5678...
Text: This is a secret message
Output file: secret.json
✅ Successfully encrypted and saved to secret.json
🔑 Key (save this for decryption): 1234...
```

3. Decrypt using the key:
```bash
npm run decrypt-file inputFile="secret.json" key="1234..."
```

## Notes

- The encrypted file is stored in JSON format containing the encrypted data, IV, and algorithm information
- A secure random key is generated automatically for each encryption
- The key must be saved securely as it's required for decryption
- The IV (Initialization Vector) is stored in the encrypted file for convenience
- The default encryption algorithm is AES-256-CBC

## License

ISC