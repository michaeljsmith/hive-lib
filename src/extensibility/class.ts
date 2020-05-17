import { TypeToken } from '@/types';

export class Class<Id extends string, Base extends {}> {
  readonly id: Id;
  base: TypeToken<Base>;
  fields: {
    [index: string]: Field<Class<Id, Base>, any, any>;
  } = {}

  constructor(id: Id, base: TypeToken<Base>) {
    this.id = id;
    this.base = base;
  }
}

type IdOf<C extends Class<any, any>> = C extends Class<infer Id, any> ? Id : never;
type BaseOf<C extends Class<any, any>> = C extends Class<any, infer Bases> ? Bases : never;

export type InstanceOf<C extends Class<any, any>> = {
  [K in IdOf<C>]?: true;
} & BaseOf<C>;

export function clazz<Id extends string, Base extends {}>(id: Id, base?: TypeToken<Base>): Class<Id, Base> {
  return new Class<Id, Base>(id, base === undefined ? {} : base);
}

export function newInstance<Id extends string, Base extends {}>(cls: Class<Id, Base>, base: Base): InstanceOf<Class<Id, Base>>;
export function newInstance<Id extends string>(cls: Class<Id, {}>): InstanceOf<Class<Id, {}>>;
export function newInstance<Id extends string>(cls: Class<Id, any>, base?: any): any {
  // TODO: determine performance implication of call Object.create() and then adding fields.
  const instance = base === undefined ? {} : Object.create(base);

  for (const key in cls.fields) {
    const field = cls.fields[key];
    instance[key] = field.initialValue;
  }

  return instance;
}

export type Field<Cls extends Class<any, any>, Key extends string, T> = {
  key: Key;
  initialValue: T;
};

export function field<Cls extends Class<any, any>, Key extends string, T>(
          cls: Cls, key: Key, type: TypeToken<T>, initialValue: T)
      : Field<Cls, Key, T> {
  const field = {key, initialValue};
  cls.fields[key] = field;
  return field;
}

export function getField<Cls extends Class<any, any>, Key extends string, T>(
      instance: InstanceOf<Cls>, field: Field<Cls, Key, T>): T {
  return instance[field.key];
}
