import * as GraphQL from "graphql";

import { Fn, Maybe, Option } from "@platform/prelude";

import * as Schema from ".";
import * as Document from "../Document";
import * as Resolvers from "./Resolvers";
import * as Root from "./Root";

export interface Config<
  StaticContext,
  SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers,
  RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers
> extends Schema.UserDefinition<SchemaResolvers> {
  readonly root?: Maybe<Root.UserDefinition<RootResolvers>>;
  readonly prefix?: Maybe<string>;
  readonly schemas?: Maybe<
    ReadonlyArray<(staticContext: StaticContext) => Schema.Schema>
  >;
}

export type UserDefinition<
  StaticContext = unknown,
  SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers,
  RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers
> =
  | ConfigFromStaticContext<StaticContext, SchemaResolvers, RootResolvers>
  | Config<StaticContext, SchemaResolvers, RootResolvers>
  | GraphQL.DocumentNode;

type ConfigFromStaticContext<
  StaticContext,
  SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers,
  RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers
> = (
  staticContext: StaticContext
) => Config<StaticContext, SchemaResolvers, RootResolvers>;

export const toSchema = <
  StaticContext = unknown,
  SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers,
  RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers
>(
  staticContext: StaticContext,
  userDefinition: UserDefinition<StaticContext, SchemaResolvers, RootResolvers>
): Schema.Schema =>
  Fn.applyFlipped(fromUserDefinition(staticContext, userDefinition))(
    ({ root, prefix, schemas, document, resolvers }) =>
      Fn.applyFlipped({
        document: Option.fromNullable(document),
        resolvers: Option.fromNullable(resolvers)
      })(
        Fn.pipe(
          schema =>
            Option.fromNullable(schemas).fold(schema, schemas =>
              schemas
                .map(Fn.applyFlipped(staticContext))
                .reduce(Schema.merge, schema)
            ),

          schema =>
            Option.fromNullable(prefix).fold(schema, prefix => ({
              document: schema.document.map(Fn.curry(Document.prefix)(prefix)),
              resolvers: schema.resolvers.map(
                Fn.curry(Resolvers.prefix)(prefix)
              )
            })),

          schema =>
            Option.fromNullable(root).fold(schema, root =>
              Root.addToSchema(root, schema)
            ),

          schema => ({
            ...schema,
            document: schema.document.map(Document.render)
          })
        )
      )
  );

const fromUserDefinition = <
  StaticContext = unknown,
  SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers,
  RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers
>(
  staticContext: StaticContext,
  userDefinition: UserDefinition<StaticContext, SchemaResolvers, RootResolvers>
): Config<StaticContext, SchemaResolvers, RootResolvers> =>
  typeof userDefinition === "function"
    ? userDefinition(staticContext)
    : !("definitions" in userDefinition)
    ? userDefinition
    : { document: userDefinition };
