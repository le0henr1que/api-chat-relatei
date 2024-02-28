import bcrypt from 'bcrypt';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
}));

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    // const { sut, salt } = makeSut();
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
  test('Should creturn a hash on success', async () => {
    // const { sut, salt } = makeSut();
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});
