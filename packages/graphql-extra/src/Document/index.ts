import {
  Array,
  Either,
  flow,
  Fn,
  Monoid,
  pipe,
  Record
} from "@grapheng/prelude";

import * as GraphQL from "graphql";

import * as TypeDefinition from "./TypeDefinition";

export type Document = GraphQL.DocumentNode;

export const concat: Monoid.Monoid<Document>["concat"] = (x, y) => ({
  ...y,
  definitions: pipe(
    [...x.definitions, ...y.definitions],
    Array.partitionMap<
      GraphQL.DefinitionNode,
      GraphQL.DefinitionNode,
      readonly [string, TypeDefinition.TypeDefinition]
    >(
      flow(
        Either.fromPredicate(TypeDefinition.is, Fn.identity),
        Either.map(typeDefinition => [
          typeDefinition.name.value,
          typeDefinition
        ])
      )
    ),
    ({ left: nonTypeDefinitions, right: typeDefinitions }) => [
      ...nonTypeDefinitions,
      ...pipe(
        typeDefinitions,
        Record.fromFoldable(TypeDefinition, Array.array),
        Record.collect((_name, definition) => definition)
      )
    ]
  )
});

export const empty: Monoid.Monoid<Document>["empty"] = {
  kind: "Document",
  definitions: []
};
