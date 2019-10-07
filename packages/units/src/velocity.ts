import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

export const relationships = {
  metersPerSecond: 1,
  kilometersPerHour: 0.277778,
  milesPerHour: 0.44704,
  knots: 0.514444855556
};

const Velocity = makeSimpleUnitTypes(relationships, "Velocity");
export default Velocity;
