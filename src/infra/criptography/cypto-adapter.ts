import { Encrypter } from '@/data/protocols/encripter';
import forge from 'node-forge';

export class CryptAdapter implements Encrypter {
  private publicKey: forge.pki.rsa.PublicKey;
  private privateKey: forge.pki.rsa.PrivateKey;

  constructor(publicKeyPem: string, privateKeyPem: string) {
    this.publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    this.privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  }

  async encrypt(value: string): Promise<string> {
    const encrypted = this.publicKey.encrypt(value, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  }
  async decrypt(encryptedText: string): Promise<string> {
    const decrypted = this.privateKey.decrypt(
      forge.util.decode64(encryptedText),
      'RSA-OAEP',
    );
    return decrypted;
  }
}
