var crypto = require('crypto');
let algorithm = 'aes-256-cbc';

let key = crypto.randomBytes(32);
let iv = crypto.randomBytes(16);
let text, method;

process.argv.forEach(function (arg, index, array) {
  if(arg.includes('method=')) {
    method = arg.replace('method=', '');
  }
  if(arg.includes('key=')) {
    key = arg.replace('key=', '');
  }
  if(arg.includes('iv=')) {
    iv = arg.replace('iv=', '');
  }
  if(arg.includes('text=')) {
    text = arg.replace('text=', '');
  }
  if(arg.includes('algorithm=')) {
    algorithm = arg.replace('algorithm=', '');
  }
});

if (!text) {
  console.error('🚨 Missing text argument');
  process.exit();
}

console.log(`Algorithm: ${algorithm}`);
console.log(`Key: ${key.toString('hex')}`);
console.log(`Initialisation Vector: ${iv.toString('hex')}`);
console.log(`Text: ${text}`);
console.log(`Method: ${method}`);

const encrypt = () => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  console.log(`Encrypted data: ${encrypted.toString('hex')}`);
};

const decrypt = () => {
  // Set the ciphertext as a buffer
  let cipherText = Buffer.from(text, 'hex');
  // Make sure key is the correct length, converting string (hex) to buffer
  key = Buffer.from(key, 'hex');
  // Make sure IV is the correct length, converting string (hex) to buffer
  iv = Buffer.from(iv, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(cipherText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  console.log(`Decrypted data: ${decrypted.toString()}`);
};

if (method === 'encrypt') {
  encrypt();
}

if (method === 'decrypt') {
  decrypt();
}
