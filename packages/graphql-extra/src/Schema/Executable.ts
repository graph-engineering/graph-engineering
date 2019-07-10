import { makeExecutableSchema } from "graphql-tools";

import { Either, Fn, Result, These } from "@platform/prelude";

import * as Schema from ".";
import * as GraphQL from "..";
import * as Config from "./Config";

export interface Executable<DynamicContext = unknown> {
  readonly context: DynamicContext;
  readonly schema: GraphQL.GraphQLSchema;
}

export const executable = <StaticContext, DynamicContext>(options: {
  readonly schema: Config.UserDefinition<StaticContext>;
  readonly context: {
    readonly static: StaticContext;
    readonly dynamic: DynamicContext;
  };
}) =>
  fromSchema(
    options.context.dynamic,
    Config.toSchema(options.context.static, options.schema)
  );

const fromSchema = <DynamicContext = unknown>(
  dynamicContext: DynamicContext,
  { document, resolvers }: Schema.Schema
): Result.Result<Executable<DynamicContext>> =>
  These.fromOptions(document, resolvers).fold(
    fail(["document", "resolvers"]),
    these =>
      these.fold(
        Fn.constant(fail(["resolvers"])),
        Fn.constant(fail(["document"])),
        (document, resolvers: any) =>
          Either.right({
            context: dynamicContext,
            schema: makeExecutableSchema({
              typeDefs: document,
              resolvers
            })
          })
      )
  );

const fail = <A>(missingFields: ReadonlyArray<string>): Result.Result<A> =>
  Result.fail(
    missingFields
      .map(field => `\`${field}\``)
      .join(" and ")
      .concat(" must be provided for an executable schema!")
  );
