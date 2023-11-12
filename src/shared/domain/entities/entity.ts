import { v4 } from 'uuid';

export abstract class Entity<Props = unknown> {
  public readonly _id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this._id = id ?? v4();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
