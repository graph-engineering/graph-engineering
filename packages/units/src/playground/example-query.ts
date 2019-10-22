export const exampleQuery = `
{
  distance(input: { millimeters: 4000 }) {
    centimeters(round: { direction: NEAREST })
    meters(round: { direction: UP })
    miles(round: { toPrecision: 5, direction: UP })
    feet(round: { toPrecision: 0 })
  }
  volume(input: { milliliters: 1000 }) {
    milliliters
    liters(round: { direction: UP })
    cubicMeters(round: { toPrecision: 3, direction: UP })
    cubicInches
    cubicFeet
    pints
    quarts
    gallons
    cups
    tablespoons
    teaspoons
  }
  velocity(input: { metersPerSecond: 20 }) {
    milesPerHour
    metersPerSecond
    kilometersPerHour
    knots
  }
  pressure(input: { pascals: 289283 }) {
    pascals
    bars
    atmospheres
    poundsPerSquareInch
    poundsPerSquareFoot
    torr
  }
  area(input: { squareMeters: 92378 }) {
    acres
    hectares
    squareFeet
    squareInches
    squareKilometers
    squareMeters
    squareMiles
    squareYards
  }
  weight(input: { pounds: 12, ounces: 4 }) {
    milligrams
    grams
    kilograms
    metricTons
    ounces
    pounds
    tons
  }
  fuelEfficiency(input: { milesPerGallon: 20 }) {
    litersPer100KM
    milesPerGallon
  }
  temperature(input: { fahrenheit:90 }) {
    celsius
    fahrenheit
    kelvin
  }
  angle(input: { degrees: 180, radians: 3.14 }) {
    radians
    milliradians
    degrees
    gradians
    arcMinutes
    arcSeconds
  }
  duration(input: { years: 1, days: 365 }) {
    humanized
    milliseconds
    seconds
    minutes
    hours
    days
    weeks
    years
  }
  date(input: { iso: "2019-10-01T00:48:59.611Z", unix: { seconds: 5 } }) {
    unix {
      milliseconds
    }
    iso
    humanized
    formatted(template: "MM/DD/YYYY hh:mm:ss A ZZ", zone: "America/Los_Angeles")
  }
}
`;
