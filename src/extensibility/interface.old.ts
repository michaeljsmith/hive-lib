// A runtime representation of the interface.
export class Interface<Id extends string, Bases extends Interface<any, any>[]> {
  readonly id: Id;
  readonly baseInterfaces: Bases;

  constructor(id: Id, ...baseInterfaces: Bases) {
    this.id = id;
    this.baseInterfaces = baseInterfaces;
  }
}

// Typescript often complains that a type 'circularly references itself' - wrapping and unwrapping
// the types in a container seems to convince it to work. 
class Box<T extends {}> {x?: T};
type Unbox<T> = T extends Box<infer X> ? X : never;

// The below is what we want to write, but this seems to run into a 'type instantiation is
// excessively deep'.

// type BoxIntersectionOf<Types extends any[]> =
//     Types extends [] ? Box<{}> :
//     ((...x: Types) => void) extends (a: infer H, ...x: infer T) => void ? Box<(H & Unbox<BoxIntersectionOf<T>>)> :
//     never;

// export type InstanceOf<T> =
//     T extends Interface<infer Id, infer Bases> ?
//         {[P in Id]: true} & BoxIntersectionOf<{[K in keyof Bases]: InstanceOf<Bases[K]>}> :
//         never;

// Instead we explicitly handle different arities. This means we support only a max number of base interfaces.
type BoxIntersectionOfInstances<Bases> =
    Bases extends [] ? Box<{}> :
    Bases extends [infer B0] ? Box<InstanceOf<B0>> :
    Bases extends [infer B0, infer B1] ? Box<InstanceOf<B0> & InstanceOf<B1>> :
    Bases extends [infer B0, infer B1, infer B2] ? Box<InstanceOf<B0> & InstanceOf<B1> & InstanceOf<B2>> :
    never;

export type InstanceOf<T> =
    T extends Interface<infer Id, infer Bases> ?
        {[P in Id]: true} & Unbox<BoxIntersectionOfInstances<Bases>> :
        never;

type A = Interface<'a', []>;
type B = Interface<'b', []>;
type C = Interface<'c', [A, B]>;
type InstanceOfA = InstanceOf<A>;
type InstanceOfB = InstanceOf<B>;
type InstanceOfC = InstanceOf<C>;
type D = Interface<'d', [A]>;
type InstanceOfD = InstanceOf<D>;

export function newInterface<Id extends string, Bases extends Interface<any, any>[]>(
        id: Id, ...baseInterfaces: Bases):
    Interface<Id, Bases> {
  return new Interface<Id, Bases>(id, ...baseInterfaces);
}
