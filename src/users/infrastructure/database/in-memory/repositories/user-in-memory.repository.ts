import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory.searchable.repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository.Repository
{
  setResetPasswordToken(
    id: string,
    token: string,
    expires: Date,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  clearResetPasswordToken(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sortableFields: string[] = ['name', 'createdAt'];

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email);

    if (!entity) {
      throw new NotFoundError(`Entity with email ${email} not found`);
    }

    return entity;
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email);

    if (entity) {
      throw new ConflictError(`Entity with email ${email} already exists`);
    }
  }

  protected async applyFilter(
    items: UserEntity[],
    filter: UserRepository.Filter,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(item =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  protected async applySort(
    items: UserEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<UserEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
