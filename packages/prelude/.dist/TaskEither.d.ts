import { TaskEither } from ".";
export * from "fp-ts/lib/TaskEither";
export declare type ErrorOr<A, L extends Error = Error> = TaskEither.TaskEither<
  L,
  A
>;
export declare const chain: import("fp-ts-contrib/lib/Do").Do2<"Either", {}>;
export declare const runUnsafe: <L, A>(
  taskEither: TaskEither.TaskEither<L, A>
) => Promise<L | A>;
