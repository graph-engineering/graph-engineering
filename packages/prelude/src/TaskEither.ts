import { chained, Either, TaskEither } from ".";
import { Fn } from "./FP";

export * from "fp-ts/lib/TaskEither";

export type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<L, A>;

export const chain = chained(Either.either);

export const runUnsafe = <L, A>(
  taskEither: TaskEither.TaskEither<L, A>
): Promise<L | A> => taskEither.fold<L | A>(Fn.identity, Fn.identity).run();
