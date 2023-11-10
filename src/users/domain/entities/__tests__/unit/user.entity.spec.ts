import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    UserEntity.validate = jest.fn();
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  });

  it('Constructor should call validate method', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props).toEqual(props);
  });

  it('Should create a new user entity', () => {
    expect(sut.props).toEqual(props);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Should return the user name', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('Should update the user name', () => {
    const newName = 'new name';
    sut.update(newName);
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.name).toEqual(newName);
  });

  it('Should return the user email', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('Should return the user password', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('Should update the user password', () => {
    const newPassword = 'new password';
    sut.updatePassword(newPassword);
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.password).toEqual(newPassword);
  });

  it('Should return the user cpf', () => {
    expect(sut.props.cpf).toBeDefined();
    expect(sut.props.cpf).toEqual(props.cpf);
    expect(typeof sut.props.password).toBe('string');
  });

  it('Should return the user created_at', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
});
