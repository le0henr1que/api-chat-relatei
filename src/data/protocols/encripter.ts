export interface Encrypter {
  encrypt: (value: string) => Promise<string>;
  decrypt: (encryptedText: string) => Promise<string>;
}
