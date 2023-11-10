import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error if the name is invalid', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: '',
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });
  });
});
