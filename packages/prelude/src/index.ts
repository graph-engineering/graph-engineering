export { Do as chained } from "fp-ts-contrib/lib/Do";

import * as Either from "./Either";
import * as Exception from "./Exception";
import * as Identity from "./Identity";
import * as JSON from "./JSON";
import * as Option from "./Option";
import * as ReadonlyArray from "./ReadonlyArray";
import * as Runtime from "./Runtime";
import * as TaskEither from "./TaskEither";
import * as These from "./These";
import * as Time from "./Time";

export {
  Either,
  Exception,
  Identity,
  JSON,
  Option,
  ReadonlyArray,
  Runtime,
  TaskEither,
  These,
  Time
};

export * from "./FP";

export type Maybe<A> = A | null | undefined;
export type Omit<A, PropertyName extends keyof A> = Pick<
  A,
  Exclude<keyof A, PropertyName>
>;

export const property = <PropertyName extends keyof any>(
  propertyName: PropertyName
) => <
  A extends SomeObject[PropertyName],
  SomeObject extends Pick<any, PropertyName>
>(
  object: SomeObject
): A => object[propertyName];
