import { printType } from "graphql";
import gql from "graphql-tag";

import Angle from "./angle";
import Area from "./area";
import Distance from "./distance";
import Duration from "./duration";
import FuelEfficiency from "./fuel-efficiency";
import Pressure from "./pressure";
import Temperature from "./temperature";
import {
  RoundingDirectionEnum,
  RoundingInputType
} from "./utils/basic-rounder";
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
  Weight,
  Duration
};

export const allTypeDefs = gql`
  ${printType(RoundingDirectionEnum)}
  ${printType(RoundingInputType)}

  ${Angle.outputType.typeDefs}
  ${Angle.inputType.typeDefs}
  ${Area.outputType.typeDefs}
  ${Area.inputType.typeDefs}
  ${FuelEfficiency.outputType.typeDefs}
  ${FuelEfficiency.inputType.typeDefs}
  ${Pressure.outputType.typeDefs}
  ${Pressure.inputType.typeDefs}
  ${Temperature.outputType.typeDefs}
  ${Temperature.inputType.typeDefs}
  ${Distance.outputType.typeDefs}
  ${Distance.inputType.typeDefs}
  ${Velocity.outputType.typeDefs}
  ${Velocity.inputType.typeDefs}
  ${Volume.outputType.typeDefs}
  ${Volume.inputType.typeDefs}
  ${Weight.outputType.typeDefs}
  ${Weight.inputType.typeDefs}
  ${Duration.outputType.typeDefs}
  ${Duration.inputType.typeDefs}
`;

export const allResolvers = {
  AngleOutput: Angle.outputType.resolvers,
  AreaOutput: Area.outputType.resolvers,
  FuelEfficiencyOutput: FuelEfficiency.outputType.resolvers,
  PressureOutput: Pressure.outputType.resolvers,
  TemperatureOutput: Temperature.outputType.resolvers,
  DistanceOutput: Distance.outputType.resolvers,
  VelocityOutput: Velocity.outputType.resolvers,
  VolumeOutput: Volume.outputType.resolvers,
  WeightOutput: Weight.outputType.resolvers,
  DurationOutput: Duration.outputType.resolvers
};
