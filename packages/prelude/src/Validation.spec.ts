import { Either, Validation } from ".";

describe("Validation", () => {
  describe("fromChecks", () => {
    type Person = {
      readonly age: number;
      readonly name: string;
    };

    const validate = Validation.fromChecks<Person>(
      person =>
        person.age >= 21
          ? Either.right(person)
          : Either.left(Error("Not old enough!")),

      person =>
        person.name !== ""
          ? Either.right(person)
          : Either.left(Error("A name must be provided.")),

      person =>
        person.name !== "Conner"
          ? Either.right(person)
          : Either.left(Error("You aren't welcome here."))
    );

    test.each`
      a                              | expected
      ${{ name: "Bob", age: 60 }}    | ${Either.right({ name: "Bob", age: 60 })}
      ${{ name: "Jane", age: 30 }}   | ${Either.right({ name: "Jane", age: 30 })}
      ${{ name: "Betsy", age: 1 }}   | ${Either.left([Error("Not old enough!")])}
      ${{ name: "", age: 50 }}       | ${Either.left([Error("A name must be provided.")])}
      ${{ name: "Conner", age: 23 }} | ${Either.left([Error("You aren't welcome here.")])}
      ${{ name: "", age: 0 }}        | ${Either.left([Error("Not old enough!"), Error("A name must be provided.")])}
    `("detailed($a) === $expected", ({ a, expected }) => {
      expect(validate(a)).toEqual(expected);
    });
  });
});
