import * as GraphQL from "graphql";
import { gql } from "..";

import { JSON, pipe } from "@grapheng/prelude";
import * as Document from ".";

const equal = (x: Document.Document, y: Document.Document): boolean => {
  const toString = (document: Document.Document): string =>
    pipe(
      GraphQL.visit(document, { enter: node => ({ ...node, loc: null }) }),
      JSON.Stringify.Always.short
    );

  return toString(x) === toString(y);
};

describe("`Document`", () => {
  const documents = {
    simple: gql`
      type Query {
        hello: String
      }
    `
  };

  describe("`concat`", () => {
    test("returns empty for two empty documents", () =>
      expect(Document.concat(Document.empty, Document.empty)).toEqual(
        Document.empty
      ));

    test("same document is unchanged", () =>
      expect(
        equal(
          documents.simple,
          Document.concat(documents.simple, documents.simple)
        )
      ).toEqual(true));

    describe("merging objects", () => {
      test("objects are merged", () =>
        expect(
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
          )
        ).toEqual(true));
    });
  });
});
