const ratio = 235.2145833;
const convert = (num: number): number => (num === 0 ? 0 : ratio / num);

export const fuelEfficiencies = {
  litersPer100KM: 1,
  milesPerGallon: {
    fromBaseUnit: convert,
    toBaseUnit: convert
  }
};
