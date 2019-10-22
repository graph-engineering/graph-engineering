import { expectSimpleObjectType } from "./utils/helpers";
import * as Velocity from "./velocity";

const allFieldsSelection = `{ kilometersPerHour knots metersPerSecond milesPerHour }`;

describe("velocity", () => {
  test("that 20 m/s makes the correct velocities", () => {
    expectSimpleObjectType(
      Velocity.GraphQL.outputType.rawType,
      { metersPerSecond: 20 },
      allFieldsSelection
    ).resolves.toEqual({
      kilometersPerHour: 71.99994240004608,
      knots: 38.87685878087841,
      metersPerSecond: 20,
      milesPerHour: 44.73872584108805
    });
  });

  test("that velocity convertInput works", () => {
    expect(
      Velocity.convertInput({ metersPerSecond: 10, kilometersPerHour: 36 })
    ).toEqual({
      kilometersPerHour: 71.99997120002304,
      knots: 38.87687433162192,
      metersPerSecond: 20.000008,
      milesPerHour: 44.738743736578385
    });
  });
});
