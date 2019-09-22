import Area, { relationships } from "./area";
import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("area", () => {
  test("that 4328 square meters makes the correct areas", () => {
    expectSimpleObjectType(
      Area.outputType.rawType,
      { squareMeters: 4328 },
      allDurationFieldsSelection
    ).resolves.toEqual({
      acres: 1.0694711455301147,
      hectares: 0.4328,
      squareFeet: 46586.224341517496,
      squareInches: 6708413.416826834,
      squareKilometers: 0.004328,
      squareMeters: 4328,
      squareMiles: 0.001671042471042471,
      squareYards: 5176.2471490575
    });
  });
});
