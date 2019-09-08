export * from "graphql";
export { default as gql } from "graphql-tag";
export { makeExecutableSchema } from "graphql-tools";

import * as Document from "./Document";
import * as Resolvers from "./Resolvers";

export { Document, Resolvers };
