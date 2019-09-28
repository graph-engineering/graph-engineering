import { Apply, Either, Error, Fn, pipe } from "@grapheng/prelude";
import { GraphQLScalarType } from "graphql";
import * as GraphQL from "graphql";
import Moment from "moment";

type Duration = Moment.Duration;

/*	
  Parse english duration expressions...	
  "now", "5 days", "1 hour", "twelve days", etc.	
*/

export default new GraphQLScalarType({
  name: "DurationEnglishInput",
  serialize: (millis: number) => Moment.duration(millis).humanize(),
  parseValue: (value: string): Duration => parse(value),
  parseLiteral: (valueNode: GraphQL.ValueNode): Duration =>
    valueNode.kind !== GraphQL.Kind.STRING
      ? Error.throw(`"${valueNode.kind}" must be a \`String\``)
      : parse(valueNode.value, valueNode)
});

const parse = (source: string, valueNode?: GraphQL.ValueNode): Duration =>
  pipe(
    toDuration(source),
    Either.fold(
      error => Error.throw(new GraphQL.GraphQLError(error.message, valueNode)),
      Fn.identity
    )
  );

export const toDuration = (english: string): Either.ErrorOr<Duration> =>
  pipe(
    englishToWords(english),
    Either.chain(words =>
      Apply.sequenceS(Either.either)({
        amount: wordToAmount(words.amount),
        unit: wordToUnit(words.unit)
      })
    ),
    Either.map(({ amount, unit }) => Moment.duration(amount, unit))
  );

const englishToWords = (
  english: string
): Either.ErrorOr<{
  readonly amount: string;
  readonly unit: string;
}> =>
  pipe(
    // "one hour"
    english.split(" "),
    ([firstWord, secondWord]) =>
      // At least three words are required
      secondWord
        ? Either.right({ amount: firstWord, unit: secondWord })
        : Either.left(
            Error.from(
              `"${english}" needs to look like "five minutes ago", "in 1 hour", "30 seconds ahead", etc.`
            )
          )
  );

const wordToAmount = (word: string): Either.ErrorOr<number> => {
  // Use the english version of a word (i.e. "two") or attempt parsing it
  const amount = wordsToNumbers[word] || parseFloat(word);
  return isNaN(amount)
    ? Either.left(Error.from(`"${word}" is not a number.`))
    : Either.right(amount);
};

const wordsToNumbers: {
  readonly [word: string]: number | undefined;
} = {
  zero: 0,
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12
};

type Unit = Moment.DurationInputArg2;

const wordToUnit = (word: string): Either.ErrorOr<Unit> =>
  `	
  year years y	
  quarter quarters q	
  month months	
  week weeks w	
  day days d	
  hour hours h	
  minute minutes m	
  second seconds s	
  millisecond milliseconds ms	
  `.includes(word.toLowerCase())
    ? Either.right(word as Unit)
    : Either.left(Error.from(`"${word}" is not a valid unit of time.`));
