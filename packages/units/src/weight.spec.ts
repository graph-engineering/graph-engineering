import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";
import Weight, { relationships } from "./weight";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("weight", () => {
  test("that 1mil milligrams should equal the correct things ", () => {
    expectSimpleObjectType(
      Weight.outputType.rawType,
      { milligrams: 1000000 },
      allDurationFieldsSelection
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
});
