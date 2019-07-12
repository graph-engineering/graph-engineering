export * from "fp-ts/lib/TaskEither";
import * as TaskEither from "fp-ts/lib/TaskEither";

import { chainFrom } from ".";
import * as Either from "./Either";
import * as Error from "./Error";
import { Fn } from "./FP";

export type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<L, A>;

export const chained = chainFrom(TaskEither.taskEither);

export const fromRight = <A, L = Error>(a: A): TaskEither.TaskEither<L, A> =>
  TaskEither.fromEither(Either.right(a));

export const tryCatchError = <A>(fn: Fn.Lazy<Promise<A>>): ErrorOr<A> =>
  TaskEither.tryCatch(fn, Error.from);

export const runUnsafe = <A>(
  taskEither: TaskEither.TaskEither<any, A>
): Promise<A> => taskEither.fold(Error.throwL, Fn.identity).run();
