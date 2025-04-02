import crypto from 'crypto';
import fs from 'fs/promises';

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    acc[key] = value;
  }
  return acc;
}, {});

const { inputFile = 'encrypted.txt', key: providedKey } = args;

if (!providedKey) {
  console.error('🚨 Missing key argument');
  process.exit(1);
}

const decryptFromFile = async () => {
  try {
    // Read the encrypted file
    const fileContent = await fs.readFile(inputFile, 'utf8');
    const encryptedData = JSON.parse(fileContent);

    const { encrypted, iv, algorithm } = encryptedData;
    const key = Buffer.from(providedKey, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');
    const cipherText = Buffer.from(encrypted, 'hex');

    console.log(`Algorithm: ${algorithm}`);
    console.log(`Key: ${key.toString('hex')}`);
    console.log(`Initialisation Vector: ${iv}`);

    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    const decrypted = Buffer.concat([
      decipher.update(cipherText),
      decipher.final()
    ]);

    console.log(`✅ Decrypted text: ${decrypted.toString()}`);
  } catch (error) {
    console.error('🚨 Decryption failed:', error.message);
    process.exit(1);
  }
};

decryptFromFile(); 