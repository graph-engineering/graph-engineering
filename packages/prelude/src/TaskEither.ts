import { Apply, chainFrom, Exception, Fn, TaskEither } from ".";

export * from "fp-ts/lib/TaskEither";

export type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<L, A>;

export const chained = () => chainFrom(TaskEither.taskEither);
export const fromRecord = () => Apply.sequenceS(TaskEither.taskEither);
export const fromTuple = () => Apply.sequenceT(TaskEither.taskEither);

export const fromTry = <A>(fn: Fn.Lazy<Promise<A>>): ErrorOr<A> =>
  TaskEither.tryCatch(fn, Exception.from);
