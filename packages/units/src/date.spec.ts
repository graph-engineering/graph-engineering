import Date from "./date";
import { expectSimpleObjectType } from "./utils/helpers";

describe("date", () => {
  test("that some date equals what it should", () => {
    expectSimpleObjectType(
      Date.outputType.rawType,
      { iso: "2019-10-01T00:48:59.611Z", unix: { seconds: 5 } },
      `{ unix { milliseconds seconds } iso formatted(template: "MM/DD/YYYY hh:mm:ss A ZZ", zone: "America/Los_Angeles")  }`
    ).resolves.toEqual({
      formatted: "09/30/2019 05:49:04 PM -0700",
      iso: "2019-10-01T00:49:04.611Z",
      unix: {
        milliseconds: 1569890944611,
        seconds: 1569890944.611
      }
    });
  });
});
