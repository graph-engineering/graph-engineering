import { Either, Option, These } from ".";

describe("These", () => {
  describe("fromNullables", () => {
    test.each`
      a            | b            | expected
      ${null}      | ${undefined} | ${Option.none}
      ${undefined} | ${null}      | ${Option.none}
      ${1}         | ${undefined} | ${Option.some(These.left(1))}
      ${null}      | ${"a"}       | ${Option.some(These.right("a"))}
      ${true}      | ${false}     | ${Option.some(These.both(true, false))}
    `("fromNullables($a, $b) === $expected", ({ a, b, expected }) =>
      expect(These.fromNullables(a, b)).toEqual(expected)
    );
  });

  describe("fromEithers", () => {
    test.each`
      a                                                                         | expected
      ${[]}                                                                     | ${Option.none}
      ${[Either.right(1)]}                                                      | ${Option.some(These.right([1]))}
      ${[Either.right(2), Either.right(3)]}                                     | ${Option.some(These.right([2, 3]))}
      ${[Either.left(4)]}                                                       | ${Option.some(These.left([4]))}
      ${[Either.left(5), Either.left(6)]}                                       | ${Option.some(These.left([5, 6]))}
      ${[Either.left(7), Either.right(8)]}                                      | ${Option.some(These.both([7], [8]))}
      ${[Either.right(9), Either.left(10)]}                                     | ${Option.some(These.both([10], [9]))}
      ${[Either.left(11), Either.right(12), Either.left(13), Either.right(14)]} | ${Option.some(These.both([11, 13], [12, 14]))}
    `("fromEithers($a) === $expected", ({ a, expected }) =>
      expect(These.fromEithers(a)).toEqual(expected)
    );
  });
});
