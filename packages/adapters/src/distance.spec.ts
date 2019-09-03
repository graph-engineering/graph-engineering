import * as Distance from "./distance";
import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";

const allDurationFieldsSelection = getObjectKeysAsSelection(Distance.distances);

describe("distance", () => {
  describe("that asking for a limited number of fields works", () => {
    test.each`
      fields
      ${["inches", "kilometers"]}
      ${["inches"]}
      ${["lightYears", "meters"]}
      ${["lightYears", "meters"]}
      ${["feet", "miles"]}
    `(
      "that asking for fields $fields creates a type with those fields only",
      ({ fields }) => {
        expect(
          Object.keys(
            Distance.makeAdapter({
              selectedFields: fields
            }).outputType.rawType.getFields()
          )
        ).toEqual(fields);
      }
    );
  });

  describe("the default adapter should come with all the appropriate responses", () => {
    const distanceAdapter = Distance.makeAdapter();

    test("that 23783 millimeters makes the right distances", () => {
      expectSimpleObjectType(
        distanceAdapter.outputType.rawType,
        23783,
        allDurationFieldsSelection
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
        distanceAdapter.outputType.rawType,
        1000,
        allDurationFieldsSelection
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
    const distanceAdapter = Distance.makeAdapter();

    test("that limited selection with rounding works fine", () => {
      expectSimpleObjectType(
        distanceAdapter.outputType.rawType,
        123910,
        `{
          centimeters
          feet(roundingDirection: UP)
          meters(maxDecimalPlaces: 1, roundingDirection: NEAREST)
          miles(maxDecimalPlaces: 2)
        }`
      ).resolves.toEqual({
        centimeters: 12391,
        feet: 407,
        meters: 123.9,
        miles: 0.07
      });
    });
  });

  describe("adding custom fields work", () => {
    const distanceAdapter = Distance.makeAdapter({
      customFields: { decimeters: 100 }
    });

    test("that limited selection with rounding works fine", () => {
      expectSimpleObjectType(
        distanceAdapter.outputType.rawType,
        105.5,
        `{
          decimeters(maxDecimalPlaces: 1, roundingDirection: NEAREST)
        }`
      ).resolves.toEqual({
        decimeters: 1.1
      });
    });
  });

  describe("trying to use objects as source in strict mode fails", () => {
    const distanceAdapter = Distance.makeAdapter();

    test.each`
      source
      ${{ thing: 1 }}
      ${{ feet: 1 }}
      ${{}}
    `(
      "that $input should fail as a source because strict mode is not false",
      ({ source }) => {
        expectSimpleObjectType(
          distanceAdapter.outputType.rawType,
          source,
          allDurationFieldsSelection
        ).rejects.toThrowError();
      }
    );
  });

  describe("using non strict mode works", () => {
    const distanceAdapter = Distance.makeAdapter({ strict: false });
    test.each`
      source            | selection                            | output
      ${{ inches: 36 }} | ${`{feet}`}                          | ${{ feet: 3 }}
      ${{ feet: 100 }}  | ${`{meters(maxDecimalPlaces: 1)}`}   | ${{ meters: 30.4 }}
      ${{ feet: 10 }}   | ${`{meters(roundingDirection: UP)}`} | ${{ meters: 4 }}
      ${{ feet: 10.9 }} | ${`{feet(roundingDirection: DOWN)}`} | ${{ feet: 10 }}
    `("that $source should resolve", ({ source, selection, output }) => {
      expectSimpleObjectType(
        distanceAdapter.outputType.rawType,
        source,
        selection
      ).resolves.toEqual(output);
    });
  });
});
