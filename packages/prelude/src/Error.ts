import { Maybe, pipe } from ".";
import * as Array from "./Array";
import { Fn } from "./FP";
import * as JSON from "./JSON";
import * as Option from "./Option";
import * as These from "./These";

export type ErrorOr<A> = A | Error;

export const from: (error?: Maybe<unknown>) => Error = Fn.flow(
  Option.fromNullable,
  Option.fold(
    () => Error("An unknown error occurred"),
    error =>
      error instanceof Error
        ? error
        : typeof error === "string"
        ? Error(error)
        : Error(
            `An unknown error occurred...\n\n${JSON.Stringify.Always.pretty(
              error
            )}`
          )
  )
);

export const fromL = (error?: Maybe<unknown>) => (): Error => from(error);

export const throwL = (error?: Maybe<unknown>) => (): never => throw_(error);
export const throw_ = (error?: Maybe<unknown>): never => {
  throw from(error);
};

export const detailed = (
  messageOrError?: Maybe<unknown>,
  details?: Maybe<unknown>
): Error =>
  pipe(
    These.fromNullables(messageOrError, details),
    Option.fold(
      from,
      These.fold(from, from, (messageOrError, details) =>
        from(`${from(messageOrError).message}\n\n${from(details)}`)
      )
    )
  );

export const detailedL = (
  messageOrError?: Maybe<unknown>,
  details?: Maybe<unknown>
) => (error?: Maybe<unknown>): Error =>
  detailed(
    messageOrError,
    pipe(
      These.fromNullables(details, error),
      Option.fold(
        Fn.constUndefined,
        These.fold(Fn.identity, Fn.identity, (details, error) => ({
          details,
          error
        }))
      )
    )
  );

export const concat = (a: Error, b: Error): Error =>
  Error(`${a.message}\n\n${b.message}`);

export const concatAll = (errors: readonly Error[]): Error =>
  pipe(
    errors,
    Array.reduce(from("Several errors occured..."), concat)
  );
