export * from "fp-ts/lib/TaskEither";
import * as TaskEither from "fp-ts/lib/TaskEither";

import { chainOf } from ".";
import * as Error from "./Error";
import { Fn } from "./FP";

export type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<L, A>;

export const chained = chainOf(TaskEither.taskEither);

export const tryCatchError = <A>(fn: Fn.Lazy<Promise<A>>): ErrorOr<A> =>
  TaskEither.tryCatch(fn, Error.of);

export const runUnsafe = <A>(
  taskEither: TaskEither.TaskEither<any, A>
): Promise<A> => taskEither.fold(Error.throwL, Fn.identity).run();
