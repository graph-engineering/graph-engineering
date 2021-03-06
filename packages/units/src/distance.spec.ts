import * as Distance from "./distance";
import { expectSimpleObjectType } from "./utils/helpers";

const allFieldsSelection = `{
  centimeters
  feet
  inches
  kilometers
  meters
  miles
  millimeters
  yards
}`;

describe("distance", () => {
  test("that distance convertInput works", () => {
    expect(Distance.convertInput({ feet: 6, inches: 12 })).toEqual({
      centimeters: 213.36000000000004,
      feet: 7.000000000000001,
      inches: 84.00000000000001,
      kilometers: 0.0021336000000000003,
      meters: 2.1336000000000004,
      miles: 0.001325757575757576,
      millimeters: 2133.6000000000004,
      yards: 2.333333333333334
    });
  });

  describe("the default should come with all the appropriate responses", () => {
    test("that 23783 millimeters makes the right distances", () => {
      expectSimpleObjectType(
        Distance.GraphQL.outputType.rawType,
        { millimeters: 23783 },
        allFieldsSelection
      ).resolves.toEqual({
        centimeters: 2378.3,
        feet: 78.0282152230971,
        inches: 936.3385826771654,
        kilometers: 0.023783,
        meters: 23.783,
        miles: 0.014778071064980514,
        millimeters: 23783,
        yards: 26.009405074365706
      });
    });

    test("that 1000 millimeters makes the right distances", () => {
      expectSimpleObjectType(
        Distance.GraphQL.outputType.rawType,
        { millimeters: 1000 },
        allFieldsSelection
      ).resolves.toEqual({
        centimeters: 100,
        feet: 3.2808398950131235,
        inches: 39.37007874015748,
        kilometers: 0.001,
        meters: 1,
        miles: 0.0006213711922373339,
        millimeters: 1000,
        yards: 1.0936132983377078
      });
    });
  });

  describe("more complicated examples work", () => {
    test("that limited selection with rounding works fine", () => {
      expectSimpleObjectType(
        Distance.GraphQL.outputType.rawType,
        { millimeters: 123910 },
        `{
          centimeters
          feet(round: { direction: UP })
          meters(round: { toPrecision: 1, direction: NEAREST })
          miles(round: { toPrecision: 2 })
        }`
      ).resolves.toEqual({
        centimeters: 12391,
        feet: 407,
        meters: 123.9,
        miles: 0.07
      });
    });
  });
});
