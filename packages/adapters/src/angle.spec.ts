import { Either, pipe } from "@grapheng/prelude";

import { angles } from "./angle";
import { flexibleCalculator } from "./utils/flexible-calculator";

describe("angle", () => {
  test("that basic angle conversions work", () => {
    // tslint:disable-next-line:no-expression-statement
    pipe(
      flexibleCalculator({ degrees: 360 }, angles.relationships),
      Either.fold(fail, result => {
        expect(result).toEqual({
          arcMinutes: 21600,
          arcSeconds: 1296000,
          degrees: 360,
          gradians: 400,
          milliradians: 6283.185307179586,
          radians: 6.283185307179586
        });
      })
    );
  });
});
