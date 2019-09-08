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
});
