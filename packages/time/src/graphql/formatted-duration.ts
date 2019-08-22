import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLNullableType,
  GraphQLObjectType,
  GraphQLString,
  printType
} from "graphql";
import Moment from "moment-timezone";

import GraphengMS from "./ms";
import { extractResolvers } from "./utils";

type Duration = Moment.Duration;

type allowableMomentMethods =
  | "asMilliseconds"
  | "asSeconds"
  | "asMinutes"
  | "asHours"
  | "asDays"
  | "asWeeks"
  | "asMonths"
  | "asYears";

const roundToNDigits = (num: number, digits: number): number =>
  parseFloat(num.toFixed(constrainRoundingNum(digits)));
const constrainRoundingNum = (num = 100) => Math.max(0, Math.min(num, 100));

const commonRoundingType = (
  type: GraphQLNullableType,
  operation: allowableMomentMethods
) => ({
  type: new GraphQLNonNull(type),
  args: { numToRound: { type: GraphQLInt } },
  resolve: (millis: Duration, args: any) =>
    roundToNDigits(Moment.duration(millis)[operation](), args.numToRound)
});

export const FormattedDuration = new GraphQLObjectType({
  name: "FormattedDuration",
  fields: () => ({
    humanized: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (millis: Duration) => Moment.duration(millis).humanize()
    },
    milliseconds: commonRoundingType(GraphengMS, "asMilliseconds"),
    seconds: commonRoundingType(GraphQLFloat, "asSeconds"),
    minutes: commonRoundingType(GraphQLFloat, "asMinutes"),
    hours: commonRoundingType(GraphQLFloat, "asHours"),
    days: commonRoundingType(GraphQLFloat, "asDays"),
    weeks: commonRoundingType(GraphQLFloat, "asWeeks"),
    months: commonRoundingType(GraphQLFloat, "asMonths"),
    years: commonRoundingType(GraphQLFloat, "asYears")
  })
});

export const resolvers = extractResolvers(FormattedDuration);

export const typeDefs = printType(FormattedDuration);
