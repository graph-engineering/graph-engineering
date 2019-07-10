import { Maybe, pipe, property } from ".";
import * as Array from "./Array";
import { Fn } from "./FP";
import * as JSON from "./JSON";
import * as Option from "./Option";
import * as String from "./String";
import * as These from "./These";

export type ErrorOr<A> = A | Error;

export const of: (error?: Maybe<unknown>) => Error = Fn.flow(
  Option.fromNullable,
  Option.fold(
    () => Error("An unknown error occurred"),
    error =>
      error instanceof Error
        ? error
        : typeof error === "string"
        ? Error(error)
        : Error(
            `An unknown error occurred...\n\n${JSON.stringifyPrettyAlways(
              error
            )}`
          )
  )
);

export const ofL = (error?: Maybe<unknown>) => (): Error => of(error);

export const throw_ = (error?: Maybe<unknown>) => (): never => throwL(error);
export const throwL = (error?: Maybe<unknown>): never => {
  throw of(error);
};

export const detailed = (message: string, details: unknown): Error =>
  of(
    `${message}${pipe(
      Option.fromNullable(details),
      Option.map(details => `\n\n${JSON.stringifyPrettyAlways(details)}`),
      Option.getOrElse(() => "")
    )}`
  );

export const detailedL = (message: string, knownDetails?: Maybe<unknown>) => (
  unknownDetails: unknown
): Error =>
  detailed(
    message,
    pipe(
      These.fromNullables(knownDetails, unknownDetails),
      Option.map(details),
      Option.toUndefined
    )
  );

const details: (
  details: These.These<unknown, unknown>
) => { readonly details: unknown } = These.fold(
  knownDetails => ({ details: knownDetails }),
  unknownDetails => ({ details: unknownDetails }),
  (knownDetails, unknownDetails) => ({
    details: {
      knownDetails,
      unknownDetails
    }
  })
);

export const combine = (errors: readonly Error[]): Error =>
  pipe(
    errors,
    Array.mutable,
    Array.map(property("message")),
    String.joinL("\n\n"),
    Error
  );
