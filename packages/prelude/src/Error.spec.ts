import { Array, flow, JSON } from ".";

import { pipe } from "fp-ts/lib/pipeable";
import * as Error_ from "./Error";
import { Fn } from "./FP";

describe("`from`", () => {
  test(
    "returns default `Error` when none was given",
    flow(
      () => Error_.from(),
      error =>
        expect(error).toBeInstanceOf(Error) &&
        expect(error.message).toBeDefined()
    )
  );

  test(
    "returns unchanged `Error` returned given an `Error`",
    flow(
      () => Error("this should be unchanged"),
      error => expect(Error_.from(error)).toEqual(error)
    )
  );

  test(
    "returns `Error` with message from given `string`",
    flow(
      () => "this should be the error message",
      message => expect(Error_.from(message)).toEqual(Error(message))
    )
  );

  test(
    "returns `Error` with message from given `string`",
    flow(
      () => "this should be the error message",
      message => expect(Error_.from(message)).toEqual(Error(message))
    )
  );

  test(
    "returns `Error` with details when given `unknown` data",
    flow(
      () => ({ unknown: "what is this?" }),
      data =>
        expect(Error_.from(data).message).toMatch(
          JSON.Stringify.Always.pretty(data)
        )
    )
  );
});

describe("`fromL`", () => {
  test(
    "returns lazy function which returns an `Error`",
    flow(
      () => Error_.from("some error message"),
      error => expect(Error_.fromL(error)()).toEqual(error)
    )
  );
});

describe("`throwL`", () => {
  test("returns lazy function which throws an `Error`", () =>
    expect(Error_.throwL()).toThrowError());
});

describe("`throw_`", () => {
  test("throws an `Error`", () => expect(() => Error_.throw_()).toThrowError());
});

describe("`detailed`", () => {
  test.skip("TODO", Fn.constVoid);
});

describe("`detailedL`", () => {
  test.skip("TODO", Fn.constVoid);
});

describe("`concat`", () => {
  test(
    "returns one `Error` when two are given",
    flow(
      () => ["first message", "second one"],
      ([first, second]) =>
        pipe(
          Error_.concat(Error_.from(first), Error_.from(second)).message,
          message =>
            expect(message).toMatch(first) && expect(message).toMatch(second)
        )
    )
  );
});

describe("`concatAll`", () => {
  test(
    "returns one `Error` when many are given",
    flow(
      () => ["first message", "second one", "last error text"],
      ([first, second, third]) =>
        pipe(
          [first, second, third],
          Array.map(Error_.from),
          Error_.concatAll,
          ({ message }) =>
            expect(message).toMatch(first) &&
            expect(message).toMatch(second) &&
            expect(message).toMatch(third)
        )
    )
  );
});
