import * as Lens from "monocle-ts";

export { Do as chainFrom } from "fp-ts-contrib/lib/Do";
export { pipe } from "fp-ts/lib/pipeable";
export { flow } from "fp-ts/lib/function";

export const hole = <A>(): A => Error.throw("Unfilled hole") as A;

// tslint:disable-next-line: no-console
export const spy = <A>(a: A): A => void console.log(a) || a;

export const equal = <A>(a: A) => (b: A): boolean => a === b;
export const notEqual = <A>(a: A) => (b: A): boolean => a !== b;

export const property = <Key extends keyof any>(key: Key) => <
  A extends B[Key],
  B extends Pick<any, Key>
>(
  object: B
): A => object[key];

import * as Array from "./Array";
import * as Either from "./Either";
import * as Error from "./Error";
import * as Immutable from "./Immutable";
import * as JSON from "./JSON";
import * as Option from "./Option";
import * as Runtime from "./Runtime";
import * as String from "./String";
import * as Task from "./Task";
import * as TaskEither from "./TaskEither";
import * as These from "./These";
import * as Time from "./Time";

export {
  Array,
  Either,
  Error,
  Immutable,
  JSON,
  Option,
  Runtime,
  String,
  Task,
  TaskEither,
  These,
  Time,
  Lens
};

export * from "./FP";

export type Maybe<A> = A | null | undefined;
