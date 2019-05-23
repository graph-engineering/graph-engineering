# Connection

`Connection` encapsulates a few GraphQL types and helpers that aid in implementing the [industry-standard "Connection" concept](https://facebook.github.io/relay/graphql/connections.htm).

## Install

`npm i --save @grapheng/connection`

## Use

```typescript
import * as Connection from '@grapheng/connection'

const myTypeDefs = gql`
	${Connection.typeDefs}
	${myOtherSchema}
`

const myResolvers = {
	myItems: (source, { first, after }) =>
		Connection.makeConnection(
			source.items.map(node => ({ node, additionalEdgeProperties: {} })),
			first,
			after
		)
}
```
