import FuelEfficiency, { relationships } from "./fuel-efficiency";
import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("fuel efficiency", () => {
  test("that 30 mpg makes the correct unit amounts", () => {
    expectSimpleObjectType(
      FuelEfficiency.outputType.rawType,
      { milesPerGallon: 30 },
      allDurationFieldsSelection
    ).resolves.toEqual({
      litersPer100KM: 7.84048611,
      milesPerGallon: 30
    });
  });
});
