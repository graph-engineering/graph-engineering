import * as GraphQL from "graphql";

import { Fn, Option, ReadonlyArray, These } from "@platform/prelude";

import * as Interface from "./Interface";

export { name as prefixName, document as prefix } from "./Prefix";

export const empty: GraphQL.DocumentNode = {
  kind: "Document",
  definitions: []
};

export const fromDefinitions = (
  definitions: ReadonlyArray<GraphQL.DefinitionNode>
): Option.Option<GraphQL.DocumentNode> =>
  Option.fromNullable(definitions[0]).map<GraphQL.DocumentNode>(() => ({
    kind: "Document",
    definitions
  }));

export const render = (
  document: GraphQL.DocumentNode
): GraphQL.DocumentNode => ({
  ...document,
  definitions: document.definitions.map(definition =>
    definition.kind === "ObjectTypeDefinition"
      ? Interface.implement(document, definition)
      : definition
  )
});

export const merge = (
  first: GraphQL.DocumentNode,
  second: GraphQL.DocumentNode
): GraphQL.DocumentNode =>
  Fn.applyFlipped([...first.definitions, ...second.definitions])(
    Fn.pipe(
      seperateDefinitions,
      ({ query, mutation, definitions }) =>
        [query, mutation].reduce(
          (previous, rootType) =>
            rootType.fold(previous, rootType => [...previous, rootType]),
          definitions
        ),
      definitions => ({
        ...first,
        definitions
      })
    )
  );

interface SeparatedDefinitions {
  readonly definitions: ReadonlyArray<GraphQL.DefinitionNode>;
  readonly query: Option.Option<GraphQL.ObjectTypeDefinitionNode>;
  readonly mutation: Option.Option<GraphQL.ObjectTypeDefinitionNode>;
}

const seperateDefinitions = (
  definitions: ReadonlyArray<GraphQL.DefinitionNode>
): SeparatedDefinitions =>
  definitions.reduce<SeparatedDefinitions>(
    (previous, definition) =>
      definition.kind !== "ObjectTypeDefinition" ||
      (definition.name.value !== "Query" &&
        definition.name.value !== "Mutation")
        ? { ...previous, definitions: [...previous.definitions, definition] }
        : Fn.applyFlipped<any>(definition.name.value.toLowerCase())(
            (operationTypeName: "query" | "mutation") => ({
              ...previous,
              [operationTypeName]: Option.some(
                previous[operationTypeName].fold(
                  definition,
                  Fn.curry(mergeObjectTypes)(definition)
                )
              )
            })
          ),
    {
      definitions: [],
      query: Option.none,
      mutation: Option.none
    }
  );

export const mergeObjectTypes = (
  first: GraphQL.ObjectTypeDefinitionNode,
  second: Pick<GraphQL.ObjectTypeDefinitionNode, "fields">
): GraphQL.ObjectTypeDefinitionNode => ({
  ...first,
  kind: "ObjectTypeDefinition",
  fields: These.fromOptions(
    Option.fromNullable(first.fields),
    Option.fromNullable(second.fields)
  ).fold([], fields =>
    fields.fold(Fn.identity, Fn.identity, (first, second) =>
      Fn.applyFlipped([...first, ...second])(
        ReadonlyArray.uniq<GraphQL.FieldDefinitionNode>({
          equals: (first, second) => first.name.value === second.name.value
        })
      )
    )
  )
});

export const findObjectType = (
  document: GraphQL.DocumentNode,
  name: string
): Option.Option<GraphQL.ObjectTypeDefinitionNode> =>
  findType(document, name).refine(
    (type): type is GraphQL.ObjectTypeDefinitionNode =>
      type.kind === "ObjectTypeDefinition"
  );

export const findInterfaceType = (
  document: GraphQL.DocumentNode,
  name: string
): Option.Option<GraphQL.InterfaceTypeDefinitionNode> =>
  findType(document, name).refine(
    (type): type is GraphQL.InterfaceTypeDefinitionNode =>
      type.kind === "InterfaceTypeDefinition"
  );

export const findType = (
  document: GraphQL.DocumentNode,
  name: string
): Option.Option<GraphQL.TypeDefinitionNode> =>
  Option.fromNullable(
    document.definitions.find(
      (definition): definition is GraphQL.TypeDefinitionNode =>
        GraphQL.isTypeDefinitionNode(definition) &&
        definition.name.value === name
    )
  );
