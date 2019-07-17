export { Do as chainFrom } from "fp-ts-contrib/lib/Do";
export { pipe } from "fp-ts/lib/pipeable";

export const equals = <A>(a: A) => (b: A): boolean => a === b;

export const property = <Key extends keyof any>(key: Key) => <
  A extends B[Key],
  B extends Pick<any, Key>
>(
  object: B
): A => object[key];

import * as Array from "./Array";
import * as Either from "./Either";
import * as Error from "./Error";
import * as JSON from "./JSON";
import * as Option from "./Option";
import * as Runtime from "./Runtime";
import * as String from "./String";
import * as TaskEither from "./TaskEither";
import * as These from "./These";
import * as Time from "./Time";

export {
  Either,
  Error,
  JSON,
  Option,
  Array,
  Runtime,
  String,
  TaskEither,
  These,
  Time
};

export * from "./FP";

export type Maybe<A> = A | null | undefined;

export type Mutable<A> = {
  -readonly [Property in keyof A]: A[Property] extends ReadonlyArray<infer B>
    ? Mutable<B>[]
    : Mutable<A[Property]>
};

export type Immutable<A> = {
  readonly [Property in keyof A]: A[Property] extends Array<infer B>
    ? readonly Immutable<B>[]
    : Immutable<A[Property]>
};
