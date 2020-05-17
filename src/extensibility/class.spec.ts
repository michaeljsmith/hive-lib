import { expect } from "chai";
import { Class, clazz, newInstance, field, getField } from './class';
import { typeToken } from "@/types";

describe('extensibility/class', function() {
  it('inherits from base', function() {
    type Base = {inherited: true};
    const cls = clazz('cls', typeToken<Base>());
    const instance = newInstance(cls, {inherited: true});
    expect(instance.inherited).equals(true);
  });

  it('has declared field', function() {
    const cls = clazz('cls');
    const f = field(cls, 'field', typeToken<number>(), 1);
    const instance = newInstance(cls);
    expect(getField(instance, f)).equals(1);
  });
});
