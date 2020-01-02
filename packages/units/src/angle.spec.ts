import * as Angle from "./angle";
import { expectSimpleObjectType } from "./utils/helpers";

const allFieldsSelection = `{ arcMinutes arcSeconds degrees gradians milliradians radians }`;

describe("angle", () => {
  test("that 1 radian and 1000 milliradians equal the correct other unit amounts", () => {
    expectSimpleObjectType(
      Angle.GraphQL.outputType.rawType,
      { radians: 1, milliradians: 1000 },
      allFieldsSelection
    ).resolves.toEqual({
      arcMinutes: 6875.493541569879,
      arcSeconds: 412529.6124941927,
      degrees: 114.59155902616465,
      gradians: 127.32395447351627,
      milliradians: 2000,
      radians: 2
    });
  });

  test("that an input of 0 convert things properly", () => {
    expect(Angle.convertInput({})).toEqual({
      arcMinutes: 0,
      arcSeconds: 0,
      degrees: 0,
      gradians: 0,
      milliradians: 0,
      radians: 0
    });
  });

  test("that angle convertInput works", () => {
    expect(Angle.convertInput({ radians: 1, milliradians: 1000 })).toEqual({
      arcMinutes: 6875.493541569879,
      arcSeconds: 412529.6124941927,
      degrees: 114.59155902616465,
      gradians: 127.32395447351627,
      milliradians: 2000,
      radians: 2
    });
  });
});
