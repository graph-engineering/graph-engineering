import { pipe } from ".";
import * as JSON from "./JSON";
import * as List from "./List";
import * as Option from "./Option";
import * as These from "./These";

export type ErrorOr<A> = A | Error;

export const from = (error?: Option.Nullable<unknown>): Error => {
  const unknownMessage = "An unknown error occurred";

  const fromUnkown = (error: unknown) =>
    error instanceof Error
      ? error
      : typeof error === "string"
      ? Error(error)
      : Error(`${unknownMessage}...\n\n${JSON.Stringify.Always.pretty(error)}`);

  return pipe(
    Option.fromNullable(error),
    Option.map(fromUnkown),
    Option.getOrElse(() => Error(unknownMessage))
  );
};

export const crash = (error?: Option.Nullable<unknown>): never => {
  throw from(error);
};

export const detailed = (
  messageOrError?: Option.Nullable<unknown>,
  details?: Option.Nullable<unknown>
): Error =>
  pipe(
    These.fromNullables(messageOrError, details),
    Option.fold(
      from,
      These.fold(from, from, (messageOrError, details) =>
        from(`${from(messageOrError).message}\n\n${from(details).message}`)
      )
    )
  );

export const concat = (a: Error, b: Error): Error =>
  from(`${a.message}\n\n${b.message}`);

export const concatAll = (errors: readonly Error[]): Error =>
  pipe(
    errors,
    List.reduce(from("Several errors occured..."), concat)
  );
