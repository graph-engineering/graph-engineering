import { Either } from ".";

describe("Either", () => {
  describe("fromTry", () => {
    test.each`
      a                     | expected
      ${() => 1}            | ${Either.right(1)}
      ${() => "a"}          | ${Either.right("a")}
      ${() => true}         | ${Either.right(true)}
      ${() => null}         | ${Either.right(null)}
      ${() => [3]}          | ${Either.right([3])}
      ${() => throwError()} | ${Either.left(Error("Oof!"))}
    `("returns `$expected`", ({ a, expected }) =>
      expect(Either.fromTry(a)).toEqual(expected)
    );
  });

  const throwError = () => {
    throw Error("Oof!");
  };
});
