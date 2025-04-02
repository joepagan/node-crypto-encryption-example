import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    acc[key] = value;
  }
  return acc;
}, {});

const { method, key: providedKey, iv: providedIv, text, algorithm: providedAlgorithm } = args;

if (!text) {
  console.error('🚨 Missing text argument');
  process.exit(1);
}

// Generate or use provided key and IV
const key = providedKey ? Buffer.from(providedKey, 'hex') : crypto.randomBytes(32);
const iv = providedIv ? Buffer.from(providedIv, 'hex') : crypto.randomBytes(16);
const finalAlgorithm = providedAlgorithm || algorithm;

console.log(`Algorithm: ${finalAlgorithm}`);
console.log(`Key: ${key.toString('hex')}`);
console.log(`Initialisation Vector: ${iv.toString('hex')}`);
console.log(`Text: ${text}`);
console.log(`Method: ${method}`);

const encrypt = () => {
  try {
    const cipher = crypto.createCipheriv(finalAlgorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text),
      cipher.final()
    ]);
    console.log(`Encrypted data: ${encrypted.toString('hex')}`);
  } catch (error) {
    console.error('🚨 Encryption failed:', error.message);
    process.exit(1);
  }
};

const decrypt = () => {
  try {
    const cipherText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv(finalAlgorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(cipherText),
      decipher.final()
    ]);
    console.log(`Decrypted data: ${decrypted.toString()}`);
  } catch (error) {
    console.error('🚨 Decryption failed:', error.message);
    process.exit(1);
  }
};

switch (method) {
  case 'encrypt':
    encrypt();
    break;
  case 'decrypt':
    decrypt();
    break;
  default:
    console.error('🚨 Invalid method. Use "encrypt" or "decrypt"');
    process.exit(1);
}
