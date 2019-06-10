import Moment from "moment";

import * as FormattedDate from "./formatted-date";
import { expectSimpleObjectType, getMillisForTwoHoursAgo } from "./utils";

describe("formatted duration", () => {
  const twoHoursAgo = getMillisForTwoHoursAgo();
  const twoHoursAgoDate = new Date(twoHoursAgo);

  test("that a basic case works", () => {
    return expectSimpleObjectType(
      FormattedDate.FormattedDate,
      twoHoursAgo,
      `
  		{
  			humanized
  			iso
  			unix {
  				seconds
  			}
  			formatted(template: "YYYY-MM-DD")
  		}`
    ).resolves.toEqual({
      humanized: "2 hours ago",
      iso: twoHoursAgoDate.toISOString(),
      unix: {
        seconds: twoHoursAgoDate.getTime() / 1000
      },
      formatted: twoHoursAgoDate.toISOString().slice(0, 10)
    });
  });

  test("that a time zone makes a different formatted date", () => {
    return expectSimpleObjectType(
      FormattedDate.FormattedDate,
      twoHoursAgo,
      `
  		{
  			formatted(template: "M/D/YYYY, h:mm:ss A", zone: "America/New_York")
  		}`
    ).resolves.toEqual({
      formatted: twoHoursAgoDate.toLocaleString("en-US", {
        timeZone: "America/New_York"
      })
    });
  });

  test.each`
    sampleType
    ${new Date()}
    ${"2019-05-02"}
    ${"2019-06-09T19:41:31.091Z"}
    ${"July 22, 2018 07:22:13 +0700"}
    ${Moment()}
  `(
    "that a source with value $sampleType should throw an error because it's not a number",
    ({ sampleType }) => {
      return expectSimpleObjectType(
        FormattedDate.FormattedDate,
        sampleType,
        `{ humanized }`
      ).rejects.toThrowError();
    }
  );
});
