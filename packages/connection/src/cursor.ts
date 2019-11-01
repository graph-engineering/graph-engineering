import { Either, Error, Fn, pipe } from "@grapheng/prelude";

const encodeBase64 = (str: string): string =>
  Buffer.from(str).toString("base64");

const decodeBase64 = (str: string): string =>
  Buffer.from(str, "base64").toString("ascii");

const objHasAllStringKeys = (keys: readonly string[]) => <T>(obj: T) =>
  Either.fromPredicate(
    (obj: T) =>
      pipe(
        Object.keys(obj),
        incomingKeys => keys.every(key => incomingKeys.includes(key))
      ),
    Error.fromL(`${obj} did not have all the keys (${keys})`)
  )(obj);

export const makeCodec = <T extends readonly string[]>(keys: T) => ({
  encode: (obj: { [K in typeof keys[number]]: string }): string =>
    pipe(
      obj,
      objHasAllStringKeys(keys),
      Either.map(validatedObj =>
        keys.reduce(
          (previous, key: typeof keys[number]) => ({
            ...previous,
            [key]: validatedObj[key]
          }),
          // tslint:disable-next-line:no-object-literal-type-assertion
          {} as { [K in typeof keys[number]]: string }
        )
      ),
      Either.map(JSON.stringify),
      Either.map(encodeBase64),
      Either.fold(
        error =>
          Error.throw(
            Error.concat(Error.from("Could not encode cursor."), error)
          ),
        Fn.identity
      )
    ),
  decode: (str: string): { [K in typeof keys[number]]: string } =>
    pipe(
      str,
      decodeBase64,
      JSON.parse
    )
});
