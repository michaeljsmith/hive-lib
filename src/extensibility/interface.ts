import { IntersectionOf } from "@/tuples";

export type Interface<Id extends string, Bases extends any[] = []> = {
  [K in Id]: true;
} & IntersectionOf<Bases>;
