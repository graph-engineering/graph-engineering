export * from "fp-ts/lib/Array";

export { array as list } from "fp-ts/lib/Array";

import * as List from "fp-ts/lib/Array";

import * as Nullable from "./Nullable";
import * as Option from "./Option";

// TODO – This is a temporary fix for dealing with fp-ts's mutable `Array` module
declare global {
  interface ReadonlyArray<T> extends Array<T> {}
}

export const is = <A>(a: unknown): a is readonly A[] => Array.isArray(a);
export const empty = <A>(): readonly A[] => [];
export const from = <A>(a: A): readonly A[] => [a];

export const nonNullables = <A>(
  as: readonly Nullable.Nullable<A>[]
): readonly A[] => List.filterMap(Option.fromNullable)(as);
