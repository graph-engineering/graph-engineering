import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";
import Velocity, { relationships } from "./velocity";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("velocity", () => {
  test("that 20 m/s makes the correct velocities", () => {
    expectSimpleObjectType(
      Velocity.outputType.rawType,
      { metersPerSecond: 20 },
      allDurationFieldsSelection
    ).resolves.toEqual({
      kilometersPerHour: 71.99994240004608,
      knots: 38.87685878087841,
      metersPerSecond: 20,
      milesPerHour: 44.73872584108805
    });
  });
});
