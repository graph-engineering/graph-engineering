import { printType } from "graphql";
import gql from "graphql-tag";

import { angles } from "./angle";
import { areas } from "./area";
import { distances } from "./distance";
import { fuelEfficiencies } from "./fuel-efficiency";
import { pressures } from "./pressure";
import { temperatures } from "./temperature";
import { RoundingDirectionEnum } from "./utils/basic-rounder";
import { createSimpleUnitModule } from "./utils/simple-unit-module-creator";
import { velocities } from "./velocity";
import { volumes } from "./volume";
import { weights } from "./weight";

export const Angle = createSimpleUnitModule(angles);
export const Area = createSimpleUnitModule(areas);
export const FuelEfficiency = createSimpleUnitModule(fuelEfficiencies);
export const Pressure = createSimpleUnitModule(pressures);
export const Temperature = createSimpleUnitModule(temperatures);
export const Distance = createSimpleUnitModule(distances);
export const Velocity = createSimpleUnitModule(velocities);
export const Volume = createSimpleUnitModule(volumes);
export const Weight = createSimpleUnitModule(weights);

export const allTypeDefs = gql`
  ${printType(RoundingDirectionEnum)}

  ${Angle.makeAdapter().outputType.typeDefs}
  ${Angle.makeAdapter().inputType.typeDefs}
  ${Area.makeAdapter().outputType.typeDefs}
  ${Area.makeAdapter().inputType.typeDefs}
  ${FuelEfficiency.makeAdapter().outputType.typeDefs}
  ${FuelEfficiency.makeAdapter().inputType.typeDefs}
  ${Pressure.makeAdapter().outputType.typeDefs}
  ${Pressure.makeAdapter().inputType.typeDefs}
  ${Temperature.makeAdapter().outputType.typeDefs}
  ${Temperature.makeAdapter().inputType.typeDefs}
  ${Distance.makeAdapter().outputType.typeDefs}
  ${Distance.makeAdapter().inputType.typeDefs}
  ${Velocity.makeAdapter().outputType.typeDefs}
  ${Velocity.makeAdapter().inputType.typeDefs}
  ${Volume.makeAdapter().outputType.typeDefs}
  ${Volume.makeAdapter().inputType.typeDefs}
  ${Weight.makeAdapter().outputType.typeDefs}
  ${Weight.makeAdapter().inputType.typeDefs}
`;

export const allDefaultAdapters = [
  Angle,
  Area,
  FuelEfficiency,
  Pressure,
  Temperature,
  Distance,
  Velocity,
  Volume,
  Weight
].map(module => module.makeAdapter());

export const allResolvers = {
  ...allDefaultAdapters.reduce(
    (previous, current) => ({
      ...previous,
      [current.outputType.rawType.name]: current.outputType.resolvers
    }),
    {}
  )
};
