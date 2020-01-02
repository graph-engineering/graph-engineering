import Moment from "moment-timezone";
import * as Date from "./date";
import { expectSimpleObjectType } from "./utils/helpers";

describe("date", () => {
  test("that some date equals what it should", () => {
    expectSimpleObjectType(
      Date.GraphQL.outputType.rawType,
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

  test("that date convertInput works", () => {
    const iso = "2019-10-01T00:48:59.611Z";
    expect(
      Date.convertInput({
        unix: { seconds: 5 },
        iso
      })
    ).toEqual(
      expect.objectContaining({
        humanized: Moment(iso)
          .add(5, "seconds")
          .fromNow(),
        iso: "2019-10-01T00:49:04.611Z",
        unix: {
          days: 18170.034081145834,
          hours: 436080.8179475,
          humanized: "50 years",
          milliseconds: 1569890944611,
          minutes: 26164849.07685,
          months: 596.97436353587,
          seconds: 1569890944.611,
          weeks: 2595.719154449405,
          years: 49.74786362798917
        }
      })
    );
  });
});
