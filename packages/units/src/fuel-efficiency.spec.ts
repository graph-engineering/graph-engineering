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

  test("that fuel efficiency convertInput works", () => {
    expect(FuelEfficiency.convertInput({ milesPerGallon: 10 })).toEqual({
      litersPer100KM: 23.521458329999998,
      milesPerGallon: 10
    });
  });
});
