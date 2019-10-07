## Getting Started

##### Install

`npm i -D @grapheng/units`

##### Abstract

adds all up

##### Use

Output types: Minimal Example:

```javascript
import { Distance, Rounding } from "@grapheng/units";

const schema = makeExecutableSchema({
  typeDefs: gql`
    ${Distance.outputType.typeDefs}
    ${Rounding.typeDefs}

    type Query {
      myQuery: DistanceOutput!
    }
  `,
  resolvers: {
    DistanceOutput: Distance.outputType.resolvers,
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
  ${Distance.inputType.typeDefs}
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

##### Experiment

`cd` into this package and `npm run start` then open `http://localhost:4000/graphql` in your browser

## Further Development TODOs

##### Bugs

- fix `moment` library drift (1000 years -> milliseconds -> years)

##### General Improvements

- make types better

##### Implement new types

- location -> tries to go out and get stuff async
- price / or specific types like dollar?

##### Complete API Re-Design:

- export each package individually?
- investigate making graphql queries completely flexible (e.g. fuel efficiency -> miles per gallon, or km per milliliter, etc.)
