import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";
import { createSimpleUnitModule } from "./utils/simple-unit-module-creator";
import { velocities } from "./velocity";

const allDurationFieldsSelection = getObjectKeysAsSelection(
  velocities.relationships
);

describe("velocity", () => {
  test("that 20 m/s makes the correct velocities", () => {
    expectSimpleObjectType(
      createSimpleUnitModule(velocities).makeAdapter().outputType.rawType,
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
