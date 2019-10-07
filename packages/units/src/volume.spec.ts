import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";
import Volume, { relationships } from "./volume";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("volume", () => {
  test("that 20000 milliliters makes the correct volumes", () => {
    expectSimpleObjectType(
      Volume.outputType.rawType,
      { milliliters: 20000 },
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

  test("that volume convertInput works", () => {
    expect(Volume.convertInput({ liters: 1, milliliters: 1000 })).toEqual({
      cubicFeet: 0.07062933344297717,
      cubicInches: 122.04748818946457,
      cubicMeters: 0.002,
      cups: 8.333333333333334,
      gallons: 0.5283441047162969,
      liters: 2,
      milliliters: 2000,
      pints: 4.226752837730375,
      quarts: 2.1133764188651876,
      tablespoons: 123.22327441207096,
      teaspoons: 41.074340448778244
    });
  });
});
