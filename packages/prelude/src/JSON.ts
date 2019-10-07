import * as Fn from "fp-ts/lib/function";

import { pipe, property } from ".";
import * as Either from "./Either";
import * as Exception from "./Exception";

export const parse = (string: string): Either.ErrorOr<unknown> =>
  Either.parseJSON(string, Exception.from);

export namespace Stringify {
  export const short = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json), onError);

  export const pretty = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json, undefined, 2), onError);

  export namespace Always {
    export const short = (json: unknown): string =>
      pipe(
        Stringify.short(json),
        Either.fold(property("message"), Fn.identity)
      );

    export const pretty = (json: unknown): string =>
      pipe(
        Stringify.pretty(json),
        Either.fold(property("message"), Fn.identity)
      );
  }
}

const onError: (error: unknown) => Error = () =>
  Exception.from("Unrepresentable JSON value...");
