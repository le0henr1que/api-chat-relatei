import { CryptAdapter } from '../../../src/infra/criptography/cypto-adapter';
import fs from 'fs';
import forge from 'node-forge';

jest.mock('node-forge', () => ({
  pki: {
    publicKeyFromPem: jest.fn().mockReturnValue({
      encrypt: jest.fn().mockReturnValue('encrypted'),
    }),
    privateKeyFromPem: jest.fn().mockReturnValue({
      decrypt: jest.fn().mockReturnValue('decrypted'),
    }),
  },
  util: {
    encode64: jest.fn().mockReturnValue('encoded'),
    decode64: jest.fn().mockReturnValue('decoded'),
  },
}));
const publicKey = fs.readFileSync('./tests/infra/keys/public-key.pem', 'utf8');
const privateKey = fs.readFileSync(
  './tests/infra/keys/private-key.pem',
  'utf8',
);
const makeSut = (): CryptAdapter => {
  return new CryptAdapter(publicKey, privateKey);
};

describe('CryptAdapter', () => {
  test('Should call publicKeyFromPem crypted publickkey with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(forge.pki, 'publicKeyFromPem');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith(publicKey);
  });
  test('Should call privateKeyFromPem crypted private key with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(forge.pki, 'privateKeyFromPem');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith(privateKey);
  });

  test('Should call decrypt and return correct values', async () => {
    const sut = makeSut();
    jest.spyOn(forge.util, 'encode64');
    const decrypt = await sut.decrypt('any_value');
    expect(decrypt).toBe('decrypted');
  });
  test('Should call decrypt and return correct values', async () => {
    const sut = makeSut();
    jest.spyOn(forge.util, 'encode64');
    const decrypt = await sut.encrypt('any_value');
    expect(decrypt).toBe('encoded');
  });
});
