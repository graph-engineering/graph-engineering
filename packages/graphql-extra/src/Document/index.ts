import {
  Array,
  Either,
  flow,
  Fn,
  JSON,
  Monoid,
  Ord,
  pipe,
  Record
} from "@grapheng/prelude";

import * as GraphQL from "graphql";

import * as TypeDefinition from "./TypeDefinition";

module Equals {
  export const equals: typeof instance["equals"] = (x, y) =>
    toString(x) === toString(y);

  const toString = (document: Document): string =>
    pipe(
      GraphQL.visit(document, { enter: node => ({ ...node, loc: null }) }),
      JSON.Stringify.Always.short
    );
}

module Concat {
  export const concat: typeof instance["concat"] = (x, y) => ({
    ...y,
    definitions: pipe(
      [...x.definitions, ...y.definitions],
      seperateDefinitions,
      ({ left: nonTypeDefinitions, right: typeDefinitions }) => [
        ...nonTypeDefinitions,
        ...mergeTypes(typeDefinitions)
      ]
    )
  });

  type NamedTypeDefinition = readonly [string, TypeDefinition.TypeDefinition];

  const seperateDefinitions = (
    definitions: readonly GraphQL.DefinitionNode[]
  ): {
    readonly left: readonly GraphQL.DefinitionNode[];
    readonly right: readonly NamedTypeDefinition[];
  } =>
    pipe(
      definitions,
      Array.partitionMap(
        flow(
          Either.fromPredicate(TypeDefinition.is, Fn.identity),
          Either.map(typeDefinition => [
            typeDefinition.name.value,
            typeDefinition
          ])
        )
      )
    );

  const mergeTypes = (
    typeDefinitions: readonly NamedTypeDefinition[]
  ): readonly TypeDefinition.TypeDefinition[] =>
    pipe(
      typeDefinitions,
      Record.fromFoldable(TypeDefinition.instance, Array.array),
      Record.collect((_name, definition) => definition)
    );
}

export type Document = GraphQL.DocumentNode;
export const instance: Monoid.Monoid<Document> & Ord.Ord<Document> = {
  empty: {
    kind: "Document",
    definitions: []
  },

  concat: Concat.concat,

  compare: (x, y) =>
    instance.equals(x, y)
      ? 0
      : x.definitions.length > y.definitions.length
      ? 1
      : -1,

  equals: Equals.equals
};

export const { empty, concat, compare, equals } = instance;
