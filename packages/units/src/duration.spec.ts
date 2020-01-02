import * as Duration from "./duration";
import { expectSimpleObjectType } from "./utils/helpers";

const allFieldsSelection = `{
  milliseconds
  seconds
  minutes
  hours
  days
  weeks
  months
  years
}`;

describe("duration", () => {
  describe("a few basic use cases work as expected", () => {
    test("that 60 seconds makes the correct durations", () => {
      expectSimpleObjectType(
        Duration.GraphQL.outputType.rawType,
        { seconds: 60 },
        allFieldsSelection
      ).resolves.toEqual({
        milliseconds: 60000,
        seconds: 60,
        minutes: 1,
        hours: 0.016666666666666666,
        days: 0.0006944444444444445,
        weeks: 0.0000992063492063492,
        months: 0.000022815891724904232,
        years: 0.000001901324310408686
      });
    });

    test("that duration convertInput works", () => {
      expect(Duration.convertInput({ seconds: 60, minutes: 10 })).toEqual({
        days: 0.007638888888888889,
        hours: 0.18333333333333332,
        humanized: "11 minutes",
        milliseconds: 660000,
        minutes: 11,
        months: 0.00025097480897394653,
        seconds: 660,
        weeks: 0.0010912698412698413,
        years: 0.000020914567414495543
      });
    });

    test("that combinations of measurements come up with the right totals", () => {
      expectSimpleObjectType(
        Duration.GraphQL.outputType.rawType,
        { seconds: 60, minutes: 3, milliseconds: 60000 },
        allFieldsSelection
      ).resolves.toEqual({
        milliseconds: 300000,
        seconds: 300,
        minutes: 5,
        hours: 0.08333333333333333,
        days: 0.003472222222222222,
        weeks: 0.000496031746031746,
        months: 0.00011407945862452114,
        years: 0.000009506621552043427
      });
    });
  });
});
