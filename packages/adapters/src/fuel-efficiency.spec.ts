import { Either, pipe } from "@grapheng/prelude";

import { fuelEfficiencies } from "./fuel-efficiency";
import { flexibleCalculator } from "./utils/flexible-calculator";

describe("fuel efficiency", () => {
  test.each`
    input                     | output
    ${{ milesPerGallon: 20 }} | ${{ milesPerGallon: 20, litersPer100KM: 11.760729164999999 }}
    ${{ milesPerGallon: 45 }} | ${{ milesPerGallon: 45, litersPer100KM: 5.22699074 }}
    ${{ litersPer100KM: 30 }} | ${{ milesPerGallon: 7.84048611, litersPer100KM: 30 }}
    ${{ litersPer100KM: 40 }} | ${{ milesPerGallon: 5.8803645824999995, litersPer100KM: 40 }}
  `("$input makes $output", ({ input, output }) => {
    // tslint:disable-next-line:no-expression-statement
    pipe(
      flexibleCalculator(input, fuelEfficiencies.relationships),
      Either.fold(fail, result => {
        expect(result).toEqual(output);
      })
    );
  });
});
