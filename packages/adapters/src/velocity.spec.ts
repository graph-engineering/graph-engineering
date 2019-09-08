import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";
import Velocity, { config } from "./velocity";

const allDurationFieldsSelection = getObjectKeysAsSelection(
  config.relationships
);

describe("velocity", () => {
  test("that 20 m/s makes the correct velocities", () => {
    expectSimpleObjectType(
      Velocity.makeAdapter().outputType.rawType,
      20,
      allDurationFieldsSelection
    ).resolves.toEqual({
      kilometersPerHour: 71.99994240004608,
      knots: 38.87685878087841,
      metersPerSecond: 20,
      milesPerHour: 44.73872584108805
    });
  });
});
