import * as Area from "./area";
import { expectSimpleObjectType } from "./utils/helpers";

const allFieldsSelection = `{
  acres
  hectares
  squareFeet
  squareInches
  squareKilometers
  squareMeters
  squareMiles
  squareYards
}`;

describe("area", () => {
  test("that 4328 square meters makes the correct areas", () => {
    expectSimpleObjectType(
      Area.GraphQL.outputType.rawType,
      { squareMeters: 4328 },
      allFieldsSelection
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

  test("that area convertInput works", () => {
    expect(Area.convertInput({ acres: 1, squareFeet: 43560 })).toEqual({
      acres: 1.9999986854005327,
      hectares: 0.809371468,
      squareFeet: 87120.05726402807,
      squareInches: 12545282.84456569,
      squareKilometers: 0.008093714680000001,
      squareMeters: 8093.71468,
      squareMiles: 0.003124986362934363,
      squareYards: 9680.006362669787
    });
  });
});
