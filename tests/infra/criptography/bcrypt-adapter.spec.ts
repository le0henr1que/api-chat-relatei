import bcrypt from 'bcrypt';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter';

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    // const { sut, salt } = makeSut();
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
