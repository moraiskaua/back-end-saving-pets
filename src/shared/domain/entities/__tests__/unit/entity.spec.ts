import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('should create an entity with a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 2 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('should accept a uuid parameter on create', () => {
    const props = { prop1: 'value1', prop2: 2 };
    const id = 'd82ba02a-2c99-4757-8ead-2cc85c835938';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('should convert a entity to json', () => {
    const props = { prop1: 'value1', prop2: 2 };
    const id = 'd82ba02a-2c99-4757-8ead-2cc85c835938';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({ id, ...props });
  });
});
