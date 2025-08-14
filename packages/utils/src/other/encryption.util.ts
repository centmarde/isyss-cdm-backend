import { envConfig } from '@isyss-cdm/constants';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

interface Hash {
  iv: string;
  content: string;
}

export const encrypt = (text: string): Hash => {
  const { encryption } = envConfig();
  const secretKey = encryption.cryptoKey;
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (hash: Hash): string => {
  const { encryption } = envConfig();
  const secretKey = encryption.cryptoKey;
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex'),
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};

export function validatePassword(
  raw: string,
  hashed: string,
  salt: string,
): boolean {
  return bcrypt.hashSync(raw, salt) === hashed;
}

export const generateKeyPair = () => {
  const { encryption } = envConfig();
  const passphrase = encryption.rsaPassPhrase;
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: passphrase,
    },
  });
};
