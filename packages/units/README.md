# Units

An experimental collection of GraphQL Types to represent units of measurement in various systems.

# Getting Started

#### Install

`npm i --save @grapheng/units`

#### Use

Output types: Minimal Example:

```javascript
import { Distance, Rounding } from "@grapheng/units";

const schema = makeExecutableSchema({
  typeDefs: gql`
    ${Distance.GraphQL.outputType.typeDefs}
    ${Rounding.typeDefs}

    type Query {
      myQuery: DistanceOutput!
    }
  `,
  resolvers: {
    DistanceOutput: Distance.GraphQL.outputType.resolvers,
    Query: {
      myQuery: () => ({ meters: 3 })
    }
  }
});
```

For Input types, writing

```javascript
import { Distance } from "@grapheng/units";

gql`
  ${Distance.GraphQL.inputType.typeDefs}
`;
```

into your schema is enough to start using `DistanceInput` anywhere. However, the library also exports a convenience function with each module to help use the type in your code.

Below is an example that offers a flexible API for input (for example `{ feet: 4, inches: 2 }`) but uses this function to convert it ultimately to millimeters (4 feet 2 inches => 1270 millimeters)

```javascript
import { Distance } from "@grapheng/units";

const resolvers = {
  Mutations: {
    addPieceOfLumberToInventory: (source, args, context) =>
      context.DB.addPieceOfLumberToInventory(
        args.boardType,
        Distance.convertInput(args.boardLength).millimeters
      )
  }
};
```

#### Playground

`cd` into this package and `npm run start` then open `http://localhost:4000/graphql` in your browser. The playground shows you a hands on example of how it feels to use this library, both client-side in the browser and server-side in the `src/playground` folder. Also note that it also contains code that demonstrates how to integrate it with the popular [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) library.

# Further Development TODOs

#### Bugs

- fix `moment` library drift (1000 years -> milliseconds -> years)

#### General Improvements

- make typescript types better with more generics
- make tests more rigorous by apply a similar set of tests to each type

#### Implement new types

- location -> tries to go out and get stuff async
- price / or specific types like dollar?

#### Complete API Re-Design:

- export each package individually?
- investigate making graphql queries completely flexible (e.g. fuel efficiency -> miles per gallon, or km per milliliter, etc.)
