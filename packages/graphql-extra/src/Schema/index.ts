import * as GraphQL from "graphql";

import { Maybe, Option } from "@platform/prelude";

import * as Document from "../Document";
import * as Config from "./Config";
import * as Resolvers from "./Resolvers";

export * from "./Executable";

export interface Schema {
  readonly document: Option.Option<GraphQL.DocumentNode>;
  readonly resolvers: Option.Option<Resolvers.Resolvers>;
}

export interface UserDefinition<
  Resolvers extends Resolvers.Resolvers = Resolvers.Resolvers
> {
  readonly document?: Maybe<GraphQL.DocumentNode>;
  readonly resolvers?: Maybe<Resolvers>;
}

export const empty: Schema = {
  document: Option.none,
  resolvers: Option.none
};

export const section = <StaticContext = unknown>() => <
  SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers,
  RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers
>(
  userDefinition: Config.UserDefinition<
    StaticContext,
    SchemaResolvers,
    RootResolvers
  >
) => (staticContext: StaticContext) =>
  Config.toSchema(staticContext, userDefinition);

export const merge = (a: Schema, b: Schema): Schema => ({
  document: Option.merge(a.document, b.document, Document.merge),
  resolvers: Option.merge(a.resolvers, b.resolvers, Resolvers.merge)
});
