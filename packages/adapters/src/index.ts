import { printType } from "graphql";
import gql from "graphql-tag";

import Angle from "./angle";
import Area from "./area";
import Distance from "./distance";
import FuelEfficiency from "./fuel-efficiency";
import Pressure from "./pressure";
import Temperature from "./temperature";
import { RoundingDirectionEnum } from "./utils/basic-rounder";
import Velocity from "./velocity";
import Volume from "./volume";
import Weight from "./weight";

export {
  Angle,
  Area,
  Distance,
  FuelEfficiency,
  Pressure,
  Temperature,
  Velocity,
  Volume,
  Weight
};

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
