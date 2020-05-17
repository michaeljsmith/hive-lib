export class TypeToken<T> {
  tokenInstance?: T;
}

export type TypeOf<Token extends TypeToken<any>> =
    Token extends TypeToken<infer T> ? T : never;

export function typeToken<T>(): TypeToken<T> {
  return new TypeToken<T>();
}
