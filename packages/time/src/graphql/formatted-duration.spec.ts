import Moment from "moment-timezone";

import * as FormattedDuration from "./formatted-duration";
import { expectSimpleObjectType } from "./utils";

describe("formatted duration", () => {
  const fiveMinutesInMillis = Moment.duration(5, "minutes").asMilliseconds();

  test("that a basic case works", () => {
    return expectSimpleObjectType(
      FormattedDuration.FormattedDuration,
      fiveMinutesInMillis,
      `{
        humanized
        milliseconds
        seconds
        minutes
        hours
        days
        weeks
        months
        years
			}`
    ).resolves.toEqual({
      days: 0.003472222222222222,
      hours: 0.08333333333333333,
      humanized: "5 minutes",
      milliseconds: 300000,
      minutes: 5,
      months: 0.00011407945862452114,
      seconds: 300,
      weeks: 0.000496031746031746,
      years: 0.000009506621552043427
    });
  });

  test("that a basic case works", () => {
    return expectSimpleObjectType(
      FormattedDuration.FormattedDuration,
      fiveMinutesInMillis,
      `{
        humanized
        milliseconds(numToRound: 4)
        seconds(numToRound: 3)
        minutes(numToRound: 2)
        hours(numToRound: 1)
        days(numToRound: 4)
        weeks(numToRound: 3)
        months(numToRound: 2)
        years(numToRound: 1)
			}`
    ).resolves.toEqual({
      days: 0.0035,
      hours: 0.1,
      humanized: "5 minutes",
      milliseconds: 300000,
      minutes: 5,
      months: 0,
      seconds: 300,
      weeks: 0,
      years: 0
    });
  });
});
