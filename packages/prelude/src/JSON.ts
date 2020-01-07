import { Either, identity, pipe } from ".";

export const parse = (string: string): Either.ErrorOr<unknown> =>
  Either.parseJSON(string, onError);

const onError = (error: unknown) =>
  Error(`Unrepresentable JSON value...\n\n${error}`);

export namespace Stringify {
  export const short = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json), onError);

  export const pretty = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json, undefined, 2), onError);

  export namespace Always {
    export const short = (json: unknown): string =>
      pipe(Stringify.short(json), Either.fold(onError, identity));

    export const pretty = (json: unknown): string =>
      pipe(Stringify.pretty(json), Either.fold(onError, identity));

    const onError = () => "{}";
  }
}
