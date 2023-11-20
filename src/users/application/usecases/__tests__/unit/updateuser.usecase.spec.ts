import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UpdateUserUseCase } from '../../updateuser.usecase';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

describe('UpdateUserUseCase unit tests', () => {
  let sut: UpdateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new UpdateUserUseCase.UseCase(repository);
  });

  it('Should thow an error when entity is not find', async () => {
    await expect(
      sut.execute({ id: 'any-id', name: 'any-name' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should throw an error when name is not defined', async () => {
    await expect(sut.execute({ id: 'any-id', name: '' })).rejects.toThrow(
      new BadRequestError('Name is required'),
    );
  });

  it('Should update user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id, name: 'new_name' });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'new_name',
      email: items[0].email,
      cpf: items[0].cpf,
      password: items[0].password,
      createdAt: items[0].createdAt,
    });
  });
});
