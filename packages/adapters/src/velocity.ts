import { createSimpleUnitModule } from "./utils/simple-unit-module-creator";

export const velocities = {
  defaultAdapterName: "VelocityAdapter",
  baseUnit: "metersPerSecond" as const,
  relationships: {
    metersPerSecond: 1,
    kilometersPerHour: 0.277778,
    milesPerHour: 0.44704,
    knots: 0.514444855556
  }
};

const Velocity = createSimpleUnitModule(velocities);
export default Velocity;
