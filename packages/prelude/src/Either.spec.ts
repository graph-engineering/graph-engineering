import { Either, Exception } from ".";

describe("Either", () => {
  describe("tryCatchError", () => {
    test.each`
      a                                | expected
      ${() => 1}                       | ${Either.right(1)}
      ${() => "a"}                     | ${Either.right("a")}
      ${() => true}                    | ${Either.right(true)}
      ${() => null}                    | ${Either.right(null)}
      ${() => [3]}                     | ${Either.right([3])}
      ${() => Exception.crash("Oof!")} | ${Either.left(Exception.from("Oof!"))}
    `("returns `$expected`", ({ a, expected }) =>
      expect(Either.tryCatchError(a)).toEqual(expected)
    );
  });
});
