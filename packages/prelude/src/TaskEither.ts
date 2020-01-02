export * from "fp-ts/lib/TaskEither";
import * as Apply from "fp-ts/lib/Apply";
import * as Fn from "fp-ts/lib/function";
import * as TaskEither from "fp-ts/lib/TaskEither";

import { chainFrom } from ".";
import * as JSON from "./JSON";

export type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<L, A>;

export const chained = chainFrom(TaskEither.taskEither);
export const fromRecord = Apply.sequenceS(TaskEither.taskEither);
export const fromTuple = Apply.sequenceT(TaskEither.taskEither);

export const fromTry = <A>(fn: Fn.Lazy<Promise<A>>): ErrorOr<A> =>
  TaskEither.tryCatch(
    fn,
    error =>
      new Error(`Unknown error...\n\n${JSON.Stringify.Always.pretty(error)}`)
  );
