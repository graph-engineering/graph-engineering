export const angles = {
  defaultAdapterName: "AngleAdapter",
  baseUnit: "radians" as const,
  relationships: {
    radians: 1,
    milliradians: 0.001,
    degrees: {  
      fromBaseUnit: (radians: number) => radians * (180 / Math.PI),
      toBaseUnit: (degrees: number) => degrees * (Math.PI / 180)
    },
    gradians: {
      fromBaseUnit: (radians: number) => radians * (200 / Math.PI),
      toBaseUnit: (gradians: number) => gradians * (Math.PI / 200)
    },
    arcMinutes: {
      fromBaseUnit: (radians: number) => radians * (10800 / Math.PI),
      toBaseUnit: (arcMinutes: number) => arcMinutes * (Math.PI / 10800)
    },
    arcSeconds: {
      fromBaseUnit: (radians: number) => radians * (648000 / Math.PI),
      toBaseUnit: (arcSeconds: number) => arcSeconds * (Math.PI / 648000)
    }
  }
};
