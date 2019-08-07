export * from "fp-ts/lib/TaskEither";
import * as TaskEither from "fp-ts/lib/TaskEither";

import { chainFrom, flow, pipe } from ".";
import * as Either from "./Either";
import * as Error from "./Error";
import { Fn } from "./FP";

export type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<L, A>;

export const chained = chainFrom(TaskEither.taskEither);

export const fromRight = <A, L = Error>(a: A): TaskEither.TaskEither<L, A> =>
  TaskEither.fromEither(Either.right(a));

export const tryCatchError = <A>(fn: Fn.Lazy<Promise<A>>): ErrorOr<A> =>
  TaskEither.tryCatch(fn, Error.from);

export const retry = <A, L=Error>(
  retryFn: () => TaskEither.TaskEither<L, A>,
  attemptsLeft: number = 3,
 ) => ( task: TaskEither.TaskEither<L, A>,
): TaskEither.TaskEither<L,A> =>
  pipe(
    task,
    TaskEither.orElse(left =>
      attemptsLeft > 0
        ? retry(retryFn, attemptsLeft - 1)(retryFn())
        : TaskEither.fromEither(Either.left(left))
    )
  );

export const runUnsafe = <A>(taskEither: ErrorOr<A>): Promise<A> | never =>
  taskEither().then(
    Either.fold(Error.throw, Fn.identity),
    flow(
      Error.from,
      Error.throw
    )
  );
