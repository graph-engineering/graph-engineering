import * as Temperature from "./temperature";
import { expectSimpleObjectType } from "./utils/helpers";

const allFieldsSelection = `{ celsius fahrenheit kelvin }`;

describe("temperature", () => {
  test("that 30 degree celsius makes the correct temperatures", () => {
    expectSimpleObjectType(
      Temperature.GraphQL.outputType.rawType,
      { celsius: 30 },
      allFieldsSelection
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
