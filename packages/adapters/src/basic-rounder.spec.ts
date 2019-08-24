import { round } from "./basic-rounder";

describe("basic rounder", () => {
  describe("basic use cases", () => {
    test.each`
      num      | maxDecimalPlaces | roundingDirection | expected
      ${6.91}  | ${1}             | ${"NEAREST"}      | ${6.9}
      ${6.91}  | ${0}             | ${"NEAREST"}      | ${7}
      ${6}     | ${1}             | ${"UP"}           | ${6}
      ${6.1}   | ${1}             | ${"UP"}           | ${6.1}
      ${6.19}  | ${1}             | ${"UP"}           | ${6.2}
      ${6.19}  | ${1}             | ${"DOWN"}         | ${6.1}
      ${6.15}  | ${1}             | ${"DOWN"}         | ${6.1}
      ${6.14}  | ${1}             | ${"DOWN"}         | ${6.1}
      ${6.19}  | ${1}             | ${"NEAREST"}      | ${6.2}
      ${6.15}  | ${1}             | ${"NEAREST"}      | ${6.2}
      ${6.14}  | ${1}             | ${"NEAREST"}      | ${6.1}
      ${6.91}  | ${0}             | ${undefined}      | ${6}
      ${6.5}   | ${0}             | ${undefined}      | ${6}
      ${6.4}   | ${0}             | ${undefined}      | ${6}
      ${6.14}  | ${1}             | ${undefined}      | ${6.1}
      ${6.19}  | ${1}             | ${undefined}      | ${6.1}
      ${6.19}  | ${2}             | ${undefined}      | ${6.19}
      ${6.199} | ${2}             | ${undefined}      | ${6.19}
      ${6.199} | ${undefined}     | ${undefined}      | ${6.199}
      ${6.333} | ${undefined}     | ${undefined}      | ${6.333}
      ${4.22}  | ${undefined}     | ${undefined}      | ${4.22}
      ${6.299} | ${undefined}     | ${undefined}      | ${6.299}
      ${6.299} | ${undefined}     | ${"UP"}           | ${7}
      ${6.299} | ${undefined}     | ${"DOWN"}         | ${6}
      ${6.499} | ${undefined}     | ${"NEAREST"}      | ${6}
      ${6.5}   | ${undefined}     | ${"NEAREST"}      | ${7}
      ${6.99}  | ${undefined}     | ${"NEAREST"}      | ${7}
    `(
      "$num with $maxDecimalPlaces max decimal places should round $roundingDirection to be $expected",
      ({ num, maxDecimalPlaces, roundingDirection, expected }) => {
        expect(round(num, { maxDecimalPlaces, roundingDirection })).toEqual(
          expected
        );
      }
    );
  });
});
