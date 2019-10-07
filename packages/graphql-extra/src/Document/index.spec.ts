import * as GraphQL from "graphql";
import { gql } from "..";

import { JSON, pipe } from "@grapheng/prelude";
import * as Document from ".";

const equal = (x: Document.Document, y: Document.Document): string => {
  const toString = (document: Document.Document): string =>
    pipe(
      GraphQL.visit(document, { enter: node => ({ ...node, loc: null }) }),
      JSON.Stringify.Always.short
    );

  return expect(toString(x)).toEqual(toString(y));
};

describe("`Document`", () => {
  const documents = {
    simple: gql`
      type Query {
        hello: String
      }
    `
  };

  test("`rename`", () =>
    equal(
      Document.rename(
        {
          SomeType: "AnotherType",
          someField: "anotherField"
        },
        gql`
          type Query {
            a: SomeType!
            b: SomeType
          }

          type SomeType {
            someField: Int!
          }
        `
      ),
      gql`
        type Query {
          a: AnotherType!
          b: AnotherType
        }

        type AnotherType {
          anotherField: Int!
        }
      `
    ));

  describe("`concat`", () => {
    test("returns empty for two empty documents", () =>
      expect(Document.concat(Document.empty, Document.empty)).toEqual(
        Document.empty
      ));

    test("same document is unchanged", () =>
      equal(
        documents.simple,
        Document.concat(documents.simple, documents.simple)
      ));

    describe("merging objects", () => {
      test("objects are merged", () =>
        equal(
          Document.concat(
            gql`
              type A {
                a: String
              }
            `,
            gql`
              type A {
                b: Int
              }
            `
          ),
          gql`
            type A {
              a: String
              b: Int
            }
          `
        ));
    });
  });
});
