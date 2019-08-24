import { makeSimpleUnitAdapter } from "./utils/simple-unit-adapter-creator";

export const velocities = {
  metersPerSecond: 1,
  kilometersPerHour: 0.277778,
  milesPerHour: 0.44704,
  knots: 0.514444855556
};

export const makeAdapter = makeSimpleUnitAdapter(velocities);
