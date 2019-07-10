import * as GraphQL from "..";

export const name = (prefix: string, name: string): string =>
  `${prefix}__${name}`;

/*
  Add a prefix (i.e. `SomePrefix__`) to every definition and type reference
  within the document which isn't already prefixed or a built-in GraphQL scalar
  type
*/
export const document = (
  prefix: string,
  document: GraphQL.DocumentNode
): GraphQL.DocumentNode =>
  GraphQL.visit(document, {
    ScalarTypeDefinition: prefixNode(prefix),
    ObjectTypeDefinition: prefixNode(prefix),
    InterfaceTypeDefinition: prefixNode(prefix),
    UnionTypeDefinition: prefixNode(prefix),
    EnumTypeDefinition: prefixNode(prefix),
    InputObjectTypeDefinition: prefixNode(prefix),
    NamedType: node =>
      !isBuiltInScalar(node.name.value) && !node.name.value.includes("__")
        ? prefixNode(prefix)(node)
        : node
  });

const prefixNode = (prefix: string) => (
  node: GraphQL.TypeDefinitionNode | GraphQL.NamedTypeNode
): GraphQL.TypeDefinitionNode | GraphQL.NamedTypeNode => ({
  ...node,
  name: {
    ...node.name,
    value: name(prefix, node.name.value)
  }
});

const isBuiltInScalar = (typeName: string): boolean =>
  GraphQL.specifiedScalarTypes.map(({ name }) => name).includes(typeName);
