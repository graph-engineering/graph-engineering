import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";
import * as Velocity from "./velocity";

const allDurationFieldsSelection = getObjectKeysAsSelection(
  Velocity.velocities
);

describe("velocity", () => {
  const velocityAdapter = Velocity.makeAdapter();

  test("that 20 m/s makes the correct velocities", () => {
    expectSimpleObjectType(
      velocityAdapter.outputType.rawType,
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
