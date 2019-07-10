import { Fn, Option, ReadonlyArray } from "@platform/prelude";

import * as Document from ".";
import * as GraphQL from "..";

/*
  GraphQL requires interface implementors to redeclare fields...

  interface A {
    x: Int
  }

  type B implements A {
    x: Int  <-- `x` is redeclared
    ...
  } 

  The following function automatically implements fields from interfaces so they
  don't have to be retyped.
*/
export const implement = (
  document: GraphQL.DocumentNode,
  objectType: GraphQL.ObjectTypeDefinitionNode
): GraphQL.ObjectTypeDefinitionNode =>
  Option.fromNullable(objectType.interfaces).fold(
    objectType,
    Fn.pipe(
      interfaceReferences =>
        interfaceReferences.map(Fn.curry(fieldsFromType)(document)),
      fields => ({ fields: ReadonlyArray.flatten(fields) }),
      Fn.curry(Document.mergeObjectTypes)(objectType)
    )
  );

const fieldsFromType = (
  document: GraphQL.DocumentNode,
  { name: { value: name } }: GraphQL.NamedTypeNode
): ReadonlyArray<GraphQL.FieldDefinitionNode> =>
  Document.findType(document, name).fold([], type =>
    type.kind === "ObjectTypeDefinition" ||
    type.kind === "InterfaceTypeDefinition"
      ? Option.fromNullable(type.fields).getOrElse([])
      : []
  );
