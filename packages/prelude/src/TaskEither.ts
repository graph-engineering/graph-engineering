export * from "fp-ts/lib/TaskEither";
import * as Apply from "fp-ts/lib/Apply";
import * as Fn from "fp-ts/lib/function";
import * as TaskEither from "fp-ts/lib/TaskEither";

import { chainFrom, flow, identity } from ".";
import * as Either from "./Either";
import * as Error from "./Error";

export type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<L, A>;

export const chained = chainFrom(TaskEither.taskEither);
export const fromRecord = Apply.sequenceS(TaskEither.taskEither);
export const fromTuple = Apply.sequenceT(TaskEither.taskEither);

export const tryCatchError = <A>(fn: Fn.Lazy<Promise<A>>): ErrorOr<A> =>
  TaskEither.tryCatch(fn, Error.from);

export const runUnsafe = <A>(
  taskEither: TaskEither.TaskEither<unknown, A>
): Promise<A> | never =>
  taskEither().then(
    Either.fold(Error.throw, identity),
    flow(
      Error.from,
      Error.throw
    )
  );
