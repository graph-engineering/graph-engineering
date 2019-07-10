import * as GraphQL from "graphql";

import { Fn, Option } from "@platform/prelude";

import * as Schema from ".";
import * as Document from "../Document";
import * as Resolvers from "./Resolvers";

export type UserDefinition<
  Resolvers extends Resolvers.Resolvers = Resolvers.Resolvers
> = GraphQL.DocumentNode | Schema.UserDefinition<Resolvers>;

export const addToSchema = (
  userDefinition: UserDefinition,
  schema: Schema.Schema
): Schema.Schema =>
  Fn.applyFlipped(fromUserDefinition(userDefinition))(root =>
    root.document.fold(schema, document =>
      document.definitions
        .filter(isRootOperationType)
        .map(definition => rootSchemaFromType(root, definition))
        .reduce(Schema.merge, schema)
    )
  );

const fromUserDefinition = (userDefinition: UserDefinition): Schema.Schema =>
  "definitions" in userDefinition
    ? { document: Option.some(userDefinition), resolvers: Option.none }
    : {
        document: Option.fromNullable(userDefinition.document),
        resolvers: Option.fromNullable(userDefinition.resolvers)
      };

const isRootOperationType = (
  definition: GraphQL.DefinitionNode
): definition is GraphQL.ObjectTypeDefinitionNode =>
  definition.kind === "ObjectTypeDefinition" &&
  (definition.name.value === "Query" || definition.name.value === "Mutation");

const rootSchemaFromType = (
  root: Schema.Schema,
  type: GraphQL.ObjectTypeDefinitionNode
): Schema.Schema => ({
  document: Document.fromDefinitions([type]),
  resolvers: root.resolvers
    .chain(resolvers => Option.fromNullable(resolvers[type.name.value]))
    .fold(defaultResolversFromType(type), resolvers =>
      Option.some({
        [type.name.value]: resolvers
      })
    )
});

const defaultResolversFromType = ({
  name: { value: name },
  fields
}: GraphQL.ObjectTypeDefinitionNode): Option.Option<Resolvers.Resolvers> =>
  Option.fromNullable(fields).map(fields => ({
    [name]: fields.reduce(
      (previous, field) => ({
        ...previous,
        [field.name.value]: (_source: unknown, args: unknown): unknown => args
      }),
      {}
    )
  }));
