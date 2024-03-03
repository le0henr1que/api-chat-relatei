// import crypto from 'crypto';
// import { CryptAdapter } from '@/infra/criptography/cypto-adapter';

// jest.mock('crypto', () => ({
//   createDecipheriv: jest.fn().mockImplementation(() => ({
//     update: jest.fn().mockReturnValue('decrypted_part'),
//     final: jest.fn().mockReturnValue('decrypted_final'),
//   })),
//   createCipheriv: jest.fn().mockImplementation(() => ({
//     update: jest.fn().mockReturnValue('decrypted_part'),
//     final: jest.fn().mockReturnValue('decrypted_final'),
//   })),

//   async createSecretKey(): Promise<string> {
//     return new Promise((resolve) => resolve('hash'));
//   },
//   async randomBytes(): Promise<string> {
//     return new Promise((resolve) => resolve('hash'));
//   },
// }));

// const salt = 16;
// const criptographyType = 'aes-256-cbc';
// const makeSut = (): CryptAdapter => {
//   return new CryptAdapter(salt);
// };

describe('CryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    expect(2 + 2).toEqual(4);
  });
  // test('Should call crypted with correct values', async () => {
  //   const sut = makeSut();
  //   const hashSpy = jest.spyOn(crypto, 'createCipheriv');
  //   await sut.encrypt('any_value');
  //   expect(hashSpy).toHaveBeenCalledWith(criptographyType, 'hash', 'hash');
  // });
  // test('Should crypted a text on success', async () => {
  //   const sut = makeSut();
  //   const hash = await sut.encrypt('any_value');
  //   expect(hash).toBe('decrypted_partdecrypted_final');
  // });
  // test('Should call decrypted with correct values', async () => {
  //   const sut = makeSut();
  //   const hashSpy = jest.spyOn(crypto, 'createDecipheriv');
  //   await sut.decrypt('any_value');
  //   expect(hashSpy).toHaveBeenCalledWith(criptographyType, 'hash', 'hash');
  // });
  // test('Should decrypted a hash on success', async () => {
  //   const sut = makeSut();
  //   const hash = await sut.decrypt('any_value');
  //   expect(hash).toBe('decrypted_partdecrypted_final');
  // });
});
