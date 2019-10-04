export * from "fp-ts/lib/Task";
import * as NonEmptyArray from "fp-ts/lib/NonEmptyArray";
import * as Task from "fp-ts/lib/Task";

import { pipe } from ".";
import * as List from "./List";
import * as Option from "./Option";
import * as TaskEither from "./TaskEither";
import * as These from "./These";

export const fromTaskEithers = <A, B>(
  taskEithers: readonly TaskEither.TaskEither<B, A>[]
): Task.Task<
  Option.Option<
    These.These<NonEmptyArray.NonEmptyArray<B>, NonEmptyArray.NonEmptyArray<A>>
  >
> =>
  pipe(
    taskEithers,
    List.array.sequence(Task.task),
    Task.map(These.fromEithers)
  );
