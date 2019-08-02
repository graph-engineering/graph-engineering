import { Array, Either, JSON, Option, pipe, These } from ".";

describe.each`
  eithers                                                                   | expected
  ${[]}                                                                     | ${Option.none}
  ${[Either.right(1)]}                                                      | ${Option.some(These.right([1]))}
  ${[Either.right(2), Either.right(3)]}                                     | ${Option.some(These.right([2, 3]))}
  ${[Either.left(4)]}                                                       | ${Option.some(These.left([4]))}
  ${[Either.left(5), Either.left(6)]}                                       | ${Option.some(These.left([5, 6]))}
  ${[Either.left(7), Either.right(8)]}                                      | ${Option.some(These.both([7], [8]))}
  ${[Either.right(9), Either.left(10)]}                                     | ${Option.some(These.both([10], [9]))}
  ${[Either.left(11), Either.right(12), Either.left(13), Either.right(14)]} | ${Option.some(These.both([11, 13], [12, 14]))}
`("`fromEithers`", ({ eithers, expected }) => {
  pipe(
    [eithers, expected],
    Array.map(JSON.Stringify.Always.short),
    ([eithers, expected]) => `\`fromEithers(${eithers}) === ${expected}\``,

    testName =>
      test(testName, () => expect(These.fromEithers(eithers)).toEqual(expected))
  );
});
