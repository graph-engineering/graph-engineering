// import * as GraphQL from "graphql";
import { gql } from "..";

import * as Document from ".";

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
      expect(Document.instance.concat(Document.empty, Document.empty)).toEqual(
        Document.instance.empty
      ));

    test("same document is unchanged", () =>
      expect(
        Document.equals(
          documents.simple,
          Document.concat(documents.simple, documents.simple)
        )
      ).toEqual(true));

    describe("merging objects", () => {
      test("objects are merged", () =>
        expect(
          Document.equals(
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

    describe("laws", () => {
      test("right identity", () =>
        expect(
          Document.equals(
            Document.concat(documents.simple, Document.empty),
            documents.simple
          )
        ).toEqual(true));

      test("left identity", () =>
        expect(
          Document.equals(
            Document.concat(Document.empty, documents.simple),
            documents.simple
          )
        ).toEqual(true));
    });
  });

  describe("`compare`", () => {
    test("equal (`0`) for empty documents", () =>
      expect(Document.compare(Document.empty, Document.empty)).toEqual(0));

    test("greater than (`1`) empty document", () =>
      expect(Document.compare(documents.simple, Document.empty)).toEqual(1));

    test("empty document less than (`-1`) other", () =>
      expect(Document.compare(Document.empty, documents.simple)).toEqual(-1));
  });

  describe("`equals`", () => {
    describe("laws", () => {
      test("reflexivity", () =>
        expect(Document.equals(Document.empty, Document.empty)).toEqual(true));

      test("symmetry", () =>
        expect(Document.equals(Document.empty, documents.simple)).toEqual(
          Document.equals(documents.simple, Document.empty)
        ));

      test("transitivity", () => expect("TODO").toBeDefined());
    });
  });
});
