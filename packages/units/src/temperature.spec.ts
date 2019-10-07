import Temperature, { relationships } from "./temperature";
import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("temperature", () => {
  test("that 30 degree celsius makes the correct temperatures", () => {
    expectSimpleObjectType(
      Temperature.outputType.rawType,
      { celsius: 30 },
      allDurationFieldsSelection
    ).resolves.toEqual({
      celsius: 30,
      fahrenheit: 86,
      kelvin: 303.15
    });
  });

  test("that temperature convertInput works", () => {
    expect(Temperature.convertInput({ celsius: 10, fahrenheit: 30 })).toEqual({
      celsius: 8.88888888888889,
      fahrenheit: 48,
      kelvin: 282.0388888888889
    });
  });
});
