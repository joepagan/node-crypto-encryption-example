import crypto from 'crypto';
import fs from 'fs/promises';

const algorithm = 'aes-256-cbc';

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    acc[key] = value;
  }
  return acc;
}, {});

const { text, outputFile = 'encrypted.json' } = args;

if (!text) {
  console.error('🚨 Missing text argument');
  process.exit(1);
}

// Generate key and IV
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

console.log(`Algorithm: ${algorithm}`);
console.log(`Key: ${key.toString('hex')}`);
console.log(`Initialisation Vector: ${iv.toString('hex')}`);
console.log(`Text: ${text}`);
console.log(`Output file: ${outputFile}`);

const encryptToFile = async () => {
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text),
      cipher.final()
    ]);

    // Create a JSON object containing the encrypted data and IV
    const encryptedData = {
      encrypted: encrypted.toString('hex'),
      iv: iv.toString('hex'),
      algorithm: algorithm
    };

    // Write to file
    await fs.writeFile(outputFile, JSON.stringify(encryptedData, null, 2));
    console.log(`✅ Successfully encrypted and saved to ${outputFile}`);
    console.log(`🔑 Key (save this for decryption): ${key.toString('hex')}`);
  } catch (error) {
    console.error('🚨 Encryption failed:', error.message);
    process.exit(1);
  }
};

encryptToFile(); 