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

      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error if the email is invalid', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: '',
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error if the password is invalid', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: '',
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error if the cpf is invalid', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        cpf: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        cpf: '',
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        cpf: 'a'.repeat(101),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        cpf: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error if the createdAt is invalid', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should validate user', () => {
      expect.assertions(0);

      const props: UserProps = UserDataBuilder({});
      new UserEntity(props);
    });
  });
});
