import * as Fn from "fp-ts/lib/function";

import { pipe } from ".";
import * as Either from "./Either";

export const parse = (string: string): Either.ErrorOr<unknown> =>
  Either.parseJSON(string, onError);

const onError = (error: unknown): Error =>
  Error(`Unrepresentable JSON value...\n\n${error}`);

export namespace Stringify {
  export const short = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json), onError);

  export const pretty = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json, undefined, 2), onError);

  export namespace Always {
    export const short = (json: unknown): string =>
      pipe(Stringify.short(json), Either.fold(onError, Fn.identity));

    export const pretty = (json: unknown): string =>
      pipe(Stringify.pretty(json), Either.fold(onError, Fn.identity));

    const onError = () => "{}";
  }
}
