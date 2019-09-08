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
