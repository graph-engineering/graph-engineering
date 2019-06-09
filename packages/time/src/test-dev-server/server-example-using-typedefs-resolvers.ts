import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

import * as MoarTypes from "../graphql";
import { getMillisForTwoHoursAgo, runApolloServer } from "./utils";

runApolloServer(
  makeExecutableSchema({
    typeDefs: gql`
      ${MoarTypes.typeDefs}
      type Query {
        twoHoursAgo: FormattedDate!
      }
    `,
    resolvers: {
      ...MoarTypes.resolvers,
      Query: {
        twoHoursAgo: getMillisForTwoHoursAgo
      }
    }
  })
);
