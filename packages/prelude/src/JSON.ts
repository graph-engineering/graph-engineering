import * as Fn from "fp-ts/lib/function";

import { pipe, property } from ".";
import * as Either from "./Either";
import * as Error from "./Error";

export const parse = (string: string): Either.ErrorOr<unknown> =>
  Either.parseJSON(string, Error.from);

export namespace Stringify {
  export const short = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json), onError);

  export const pretty = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json, undefined, 2), onError);

  export namespace Always {
    export const short = (json: unknown): string =>
      pipe(
        json,
        Stringify.short,
        Either.fold(property("message"), Fn.identity)
      );

    export const pretty = (json: unknown): string =>
      pipe(
        json,
        Stringify.pretty,
        Either.fold(property("message"), Fn.identity)
      );
  }
}

const onError: (error: unknown) => Error = () =>
  Error.from("Unrepresentable JSON value...");
