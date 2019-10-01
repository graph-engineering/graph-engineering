import { pipe } from "fp-ts/lib/pipeable";

import { Either, JSON } from ".";
import { Fn } from "./FP";

describe("JSON", () => {
  describe("parse", () => {
    describe("valid json", () => {
      test.each`
        a               | expected
        ${"[true]"}     | ${[true]}
        ${"[1]"}        | ${[1]}
        ${`["a"]`}      | ${["a"]}
        ${`{"a":true}`} | ${{ a: true }}
        ${`{"b":1}`}    | ${{ b: 1 }}
        ${`{"c":"a"}`}  | ${{ c: "a" }}
      `("JSON.parse($a) === $expected", ({ a, expected }) =>
        expect(JSON.parse(a)).toEqual(Either.right(expected))
      );
    });

    describe("invalid json", () => {
      test.each`
        a
        ${"[true1]"}
        ${"`[1]"}
        ${"[a]"}
        ${`{"a':true}`}
        ${`{"a","b":1}`}
        ${`{"c""a"}`}
      `("JSON.parse($a).left instanceof Error === true", ({ a }) =>
        pipe(
          JSON.parse(a),
          Either.fold(error => error instanceof Error, Fn.constFalse),
          isError => expect(isError).toEqual(true)
        )
      );
    });
  });

  describe("Stringify", () => {
    const bigInt = BigInt(
      "0b11111111111111111111111111111111111111111111111111111"
    );

    describe("short", () => {
      describe("can't be stringified", () => {
        test.each`
          a              | expected
          ${{ a: true }} | ${`{"a":true}`}
          ${{ b: 1 }}    | ${`{"b":1}`}
          ${{ c: "a" }}  | ${`{"c":"a"}`}
        `("short($a) === Always.short($a) === $expected", ({ a, expected }) => {
          expect(JSON.Stringify.short(a)).toEqual(Either.right(expected));
          expect(JSON.Stringify.Always.short(a)).toEqual(expected);
        });
      });

      test.each`
        a              | expected
        ${{ a: true }} | ${`{"a":true}`}
        ${{ b: 1 }}    | ${`{"b":1}`}
        ${{ c: "a" }}  | ${`{"c":"a"}`}
      `("short($a) === Always.short($a) === $expected", ({ a, expected }) => {
        expect(JSON.Stringify.short(a)).toEqual(Either.right(expected));
        expect(JSON.Stringify.Always.short(a)).toEqual(expected);
      });
    });

    describe("pretty", () => {
      test.each`
        a              | expected
        ${{ a: true }} | ${`{\n  "a": true\n}`}
        ${{ b: 1 }}    | ${`{\n  "b": 1\n}`}
        ${{ c: "a" }}  | ${`{\n  "c": "a"\n}`}
      `("short($a) === Always.short($a) === $expected", ({ a, expected }) => {
        expect(JSON.Stringify.pretty(a)).toEqual(Either.right(expected));
        expect(JSON.Stringify.Always.pretty(a)).toEqual(expected);
      });
    });

    describe("Always", () => {
      const circular: any = {};

      // tslint:disable-next-line: no-expression-statement no-object-mutation
      circular.circular = circular;

      test.each`
        a
        ${circular}
        ${{ b: bigInt }}
      `("short($a) === pretty($a)", ({ a }) => {
        expect(typeof JSON.Stringify.Always.short(a)).toEqual("string");
        expect(typeof JSON.Stringify.Always.pretty(a)).toEqual("string");
      });
    });
  });
});
