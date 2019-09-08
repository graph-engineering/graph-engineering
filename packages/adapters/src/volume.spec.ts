import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";
import Volume, { config } from "./volume";

const allDurationFieldsSelection = getObjectKeysAsSelection(
  config.relationships
);

describe("volume", () => {
  test("that 20000 milliliters makes the correct volumes", () => {
    expectSimpleObjectType(
      Volume.makeAdapter().outputType.rawType,
      20000,
      allDurationFieldsSelection
    ).resolves.toEqual({
      cubicFeet: 0.7062933344297717,
      cubicInches: 1220.4748818946457,
      cubicMeters: 0.02,
      cups: 83.33333333333333,
      gallons: 5.2834410471629685,
      liters: 20,
      milliliters: 20000,
      pints: 42.26752837730375,
      quarts: 21.133764188651874,
      tablespoons: 1232.2327441207096,
      teaspoons: 410.7434044877824
    });
  });
});
