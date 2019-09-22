import Pressure, { relationships } from "./pressure";
import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("pressure", () => {
  test("that 12345 pascals makes the correct pressures", () => {
    expectSimpleObjectType(
      Pressure.outputType.rawType,
      { pascals: 12345 },
      allDurationFieldsSelection
    ).resolves.toEqual({
      atmospheres: 0.12183566525184651,
      bars: 0.12345,
      pascals: 12345,
      poundsPerSquareFoot: 257.83068610067096,
      poundsPerSquareInch: 1.790490169345996,
      torr: 92.5951147298316
    });
  });
});
