import {
  GraphQLError,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  printType
} from "graphql";
import Moment from "moment-timezone";

import { FormattedDuration } from "./formatted-duration";
import { extractResolvers } from "./utils";

// TODO: I'm not immediately sure why this can't be used below.
// interface FormattedFieldArgs {
// 	template: string
// 	zone: string
// }

const getDate = (millis: unknown): Date => {
  if (typeof millis === "number") {
    return new Date(millis);
  }
  throw new GraphQLError("Input must be milliseconds since Unix Epoch.");
};

export const FormattedDate = new GraphQLObjectType({
  name: "FormattedDate",
  fields: () => ({
    unix: {
      type: new GraphQLNonNull(FormattedDuration),
      resolve: (millis: unknown) => millis
    },
    iso: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (millis: unknown) => getDate(millis).toISOString()
    },
    humanized: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (millis: unknown) => Moment(getDate(millis)).fromNow()
    },
    formatted: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        template: { type: new GraphQLNonNull(GraphQLString) },
        zone: { type: GraphQLString }
      },
      resolve: (millis: unknown, args: any) =>
        Moment(getDate(millis))
          .tz(args.zone || "UTC")
          .format(args.template)
    }
  })
});

export const resolvers = extractResolvers(FormattedDate);

export const typeDefs = printType(FormattedDate);
