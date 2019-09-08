import Angle, { relationships } from "./angle";
import {
  expectSimpleObjectType,
  getObjectKeysAsSelection
} from "./utils/helpers";

const allDurationFieldsSelection = getObjectKeysAsSelection(relationships);

describe("angle", () => {
  test("that 1 radian and 1000 milliradians equal the correct other unit amounts", () => {
    expectSimpleObjectType(
      Angle.outputType.rawType,
      { radians: 1, milliradians: 1000 },
      allDurationFieldsSelection
    ).resolves.toEqual({
      arcMinutes: 6875.493541569879,
      arcSeconds: 412529.6124941927,
      degrees: 114.59155902616465,
      gradians: 127.32395447351627,
      milliradians: 2000,
      radians: 2
    });
  });
});
