import { Encrypter } from '@/data/protocols/encripter';
import crypto, { scryptSync } from 'crypto';

export class CryptAdapter implements Encrypter {
  private readonly salt: number;
  private readonly algorithm: string;

  constructor(salt: number) {
    this.salt = salt;
    this.algorithm = 'aes-256-cbc';
  }

  async encrypt(value: string): Promise<string> {
    // const key = 'uma-chave-secreta';
    // const iv = 'um-vetor-de-inicialização';

    // const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    // let encryptedData = cipher.update(value, 'utf8', 'hex');
    // console.log(encryptedData);

    // return (encryptedData += cipher.final('hex'));
    return value;
  }
  async decrypt(value: string): Promise<string> {
    // const key = 'uma-chave-secreta';
    // const iv = 'um-vetor-de-inicialização';
    // const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    // let decryptedData = decipher.update(value, 'hex', 'utf8');
    // console.log(decryptedData);
    // return (decryptedData += decipher.final('utf8'));
    return value;
  }
}
