import { BcryptjsHashProvider } from '../../bcryptjs-hash.provider';

describe('BcryptjsHashProvider unit tests', () => {
  let sut: BcryptjsHashProvider;

  beforeEach(() => {
    sut = new BcryptjsHashProvider();
  });

  it('Should return a hashed password', async () => {
    const password = 'any_password';
    const hashedPassword = await sut.generateHash(password);

    expect(hashedPassword).not.toBe(password);
  });

  it('Should return false if compare fails', async () => {
    const password = 'any_password';
    const hashedPassword = await sut.generateHash(password);
    const result = await sut.compareHash('wrong_password', hashedPassword);

    expect(result).toBeFalsy();
  });

  it('Should return true if compare succeeds', async () => {
    const password = 'any_password';
    const hashedPassword = await sut.generateHash(password);
    const result = await sut.compareHash(password, hashedPassword);

    expect(result).toBeTruthy();
  });
});
