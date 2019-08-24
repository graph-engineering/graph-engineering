import { Either } from "@grapheng/prelude";

import { compareObjects, flexibleCalculator } from "./flexible-calculator";

describe("flexible calculate", () => {
  describe("compareObjects", () => {
    test.each`
      input             | lookup            | output
      ${{ a: 1 }}       | ${{ a: 2, b: 3 }} | ${{ a: 1 }}
      ${{ b: 1 }}       | ${{ a: 2, b: 3 }} | ${{ b: 1 }}
      ${{ c: 1 }}       | ${{ a: 2, b: 3 }} | ${{}}
      ${{ a: 1, c: 1 }} | ${{ a: 2, b: 3 }} | ${{ a: 1 }}
    `("that fields of $output were in $lookup", ({ input, lookup, output }) => {
      expect(compareObjects(true, input, lookup)).toEqual(output);
    });

    test.each`
      input             | lookup            | output
      ${{ a: 1 }}       | ${{ a: 2, b: 3 }} | ${{}}
      ${{ b: 1 }}       | ${{ a: 2, b: 3 }} | ${{}}
      ${{ c: 1 }}       | ${{ a: 2, b: 3 }} | ${{ c: 1 }}
      ${{ a: 1, c: 1 }} | ${{ a: 2, b: 3 }} | ${{ c: 1 }}
    `(
      "that fields of $output weren't in $lookup",
      ({ input, lookup, output }) => {
        expect(compareObjects(false, input, lookup)).toEqual(output);
      }
    );
  });

  describe("flexibleCalculator", () => {
    const simpleTable = {
      inches: 1,
      feet: 12,
      yards: 36
    };

    test.each`
      input                      | output
      ${{ yards: 1 }}            | ${{ inches: 36, feet: 3, yards: 1 }}
      ${{ yards: 2 }}            | ${{ inches: 72, feet: 6, yards: 2 }}
      ${{ yards: 2, wat: 2 }}    | ${{ inches: 72, feet: 6, yards: 2 }}
      ${{ inches: 36 }}          | ${{ inches: 36, feet: 3, yards: 1 }}
      ${{ feet: 0.5 }}           | ${{ inches: 6, feet: 0.5, yards: 1 / 6 }}
      ${{ yards: 1, inches: 1 }} | ${{ yards: 1, inches: 1, feet: 3 }}
      ${{ inches: 1, yards: 1 }} | ${{ yards: 1, inches: 1, feet: 1 / 12 }}
    `(
      "that when using simpleTable, $input make $output",
      ({ input, output }) => {
        expect(flexibleCalculator(input, simpleTable)).toEqual(
          Either.right(output)
        );
      }
    );

    test.each`
      input
      ${{}}
      ${{ random: 2 }}
      ${{ feet: "2" }}
      ${{ feet: {} }}
      ${{ feet: undefined }}
      ${{ feet: null }}
    `(
      "that it should fail if not at least one thing in common",
      ({ input }) => {
        expect(Either.isLeft(flexibleCalculator(input, simpleTable))).toEqual(
          true
        );
      }
    );
  });
});
