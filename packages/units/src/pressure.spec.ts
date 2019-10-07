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

  test("that pressure convertInput works", () => {
    expect(Pressure.convertInput({ atmospheres: 3, pascals: 101325 })).toEqual({
      atmospheres: 3.999999901307683,
      bars: 4.0530003,
      pascals: 405300.02999999997,
      poundsPerSquareFoot: 8464.867137425881,
      poundsPerSquareInch: 58.78377637510224,
      torr: 3040.000225018565
    });
  });
});
