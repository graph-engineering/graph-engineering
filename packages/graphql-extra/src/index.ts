import * as Document from "./Document";
import * as Execute from "./Execute";
import * as Schema from "./Schema";

export * from "graphql";
export { default as gql } from "graphql-tag";
export { makeExecutableSchema } from "graphql-tools";

export { Document, Execute, Schema };
