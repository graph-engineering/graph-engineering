import { printType } from "graphql";
import gql from "graphql-tag";

import * as Angle from "./angle";
import * as Area from "./area";
import * as Date from "./date";
import * as Distance from "./distance";
import * as Duration from "./duration";
import * as FuelEfficiency from "./fuel-efficiency";
import * as Pressure from "./pressure";
import * as Temperature from "./temperature";
import {
  RoundingDirectionEnum,
  RoundingInputType
} from "./utils/basic-rounder";
import * as Velocity from "./velocity";
import * as Volume from "./volume";
import * as Weight from "./weight";

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
  Duration,
  Date
};

export const Rounding = {
  typeDefs: gql`
    ${printType(RoundingDirectionEnum)}
    ${printType(RoundingInputType)}
  `,
  RoundingDirectionEnum,
  RoundingInputType
};

export const allTypeDefs = gql`
  ${Rounding.typeDefs}

  ${Angle.GraphQL.outputType.typeDefs}
  ${Angle.GraphQL.inputType.typeDefs}
  ${Area.GraphQL.outputType.typeDefs}
  ${Area.GraphQL.inputType.typeDefs}
  ${FuelEfficiency.GraphQL.outputType.typeDefs}
  ${FuelEfficiency.GraphQL.inputType.typeDefs}
  ${Pressure.GraphQL.outputType.typeDefs}
  ${Pressure.GraphQL.inputType.typeDefs}
  ${Temperature.GraphQL.outputType.typeDefs}
  ${Temperature.GraphQL.inputType.typeDefs}
  ${Distance.GraphQL.outputType.typeDefs}
  ${Distance.GraphQL.inputType.typeDefs}
  ${Velocity.GraphQL.outputType.typeDefs}
  ${Velocity.GraphQL.inputType.typeDefs}
  ${Volume.GraphQL.outputType.typeDefs}
  ${Volume.GraphQL.inputType.typeDefs}
  ${Weight.GraphQL.outputType.typeDefs}
  ${Weight.GraphQL.inputType.typeDefs}
  ${Duration.GraphQL.outputType.typeDefs}
  ${Duration.GraphQL.inputType.typeDefs}
  ${Date.GraphQL.outputType.typeDefs}
  ${Date.GraphQL.inputType.typeDefs}
`;

export const allResolvers = {
  AngleOutput: Angle.GraphQL.outputType.resolvers,
  AreaOutput: Area.GraphQL.outputType.resolvers,
  FuelEfficiencyOutput: FuelEfficiency.GraphQL.outputType.resolvers,
  PressureOutput: Pressure.GraphQL.outputType.resolvers,
  TemperatureOutput: Temperature.GraphQL.outputType.resolvers,
  DistanceOutput: Distance.GraphQL.outputType.resolvers,
  VelocityOutput: Velocity.GraphQL.outputType.resolvers,
  VolumeOutput: Volume.GraphQL.outputType.resolvers,
  WeightOutput: Weight.GraphQL.outputType.resolvers,
  DurationOutput: Duration.GraphQL.outputType.resolvers,
  DateOutput: Date.GraphQL.outputType.resolvers
};
