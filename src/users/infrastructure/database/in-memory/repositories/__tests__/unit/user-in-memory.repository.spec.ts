import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserInMemoryRepository } from '../../user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { ConflictError } from '@/shared/domain/errors/conflict-error';

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  });

  it('Should throw an error if email not found', async () => {
    await expect(sut.findByEmail('invalid@email')).rejects.toThrow(
      new NotFoundError('Entity with email invalid@email not found'),
    );
  });

  it('Should return an entity if email found', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    const result = await sut.findByEmail(entity.email);

    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it('Should throw an error if email already exists', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError(`Entity with email ${entity.email} already exists`),
    );
  });

  it('Should find an entity by email', async () => {
    expect.assertions(0);
    await sut.emailExists('any_email');
  });

  it('Should not filter entities if no filters are provided', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const filteredItems = await sut['applyFilter'](result, null);

    expect(spyFilter).not.toHaveBeenCalled();
    expect(filteredItems).toStrictEqual(result);
  });

  it('Should filter name if provided', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'Test' })),
      new UserEntity(UserDataBuilder({ name: 'TEST' })),
      new UserEntity(UserDataBuilder({ name: 'fake' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const filteredItems = await sut['applyFilter'](items, 'TEST');

    expect(spyFilter).toHaveBeenCalled();
    expect(filteredItems).toStrictEqual([items[0], items[1]]);
  });

  it('Should sort by createdAt if not provided', async () => {
    const createdAt = new Date();
    const items = [
      new UserEntity(UserDataBuilder({ name: 'Test', createdAt: new Date() })),
      new UserEntity(
        UserDataBuilder({
          name: 'TEST',
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new UserEntity(
        UserDataBuilder({
          name: 'fake',
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];

    const sortedItems = await sut['applySort'](items, null, null);
    expect(sortedItems).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('Should sort by name', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'c' })),
      new UserEntity(UserDataBuilder({ name: 'd' })),
      new UserEntity(UserDataBuilder({ name: 'a' })),
    ];

    let sortedItems = await sut['applySort'](items, 'name', 'asc');
    expect(sortedItems).toStrictEqual([items[2], items[0], items[1]]);

    sortedItems = await sut['applySort'](items, 'name', null);
    expect(sortedItems).toStrictEqual([items[1], items[0], items[2]]);
  });
});
