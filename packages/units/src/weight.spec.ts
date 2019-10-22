import { expectSimpleObjectType } from "./utils/helpers";
import * as Weight from "./weight";

const allFieldsSelection = `{
  grams
  kilograms
  metricTons
  milligrams
  ounces
  pounds
  tons
}`;

describe("weight", () => {
  test("that 1mil milligrams should equal the correct things ", () => {
    expectSimpleObjectType(
      Weight.GraphQL.outputType.rawType,
      { milligrams: 1000000 },
      allFieldsSelection
    ).resolves.toEqual({
      grams: 1000,
      kilograms: 1,
      metricTons: 0.001,
      milligrams: 1000000,
      ounces: 35.27399072294044,
      pounds: 2.2046244201837775,
      tons: 0.0011023122100918888
    });
  });

  test("that weight convertInput works", () => {
    expect(Weight.convertInput({ grams: 1000, kilograms: 1 })).toEqual({
      grams: 2000,
      kilograms: 2,
      metricTons: 0.002,
      milligrams: 2000000,
      ounces: 70.54798144588088,
      pounds: 4.409248840367555,
      tons: 0.0022046244201837776
    });
  });
});
