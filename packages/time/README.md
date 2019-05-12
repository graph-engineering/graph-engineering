# Moar Types

A library of custom GraphQL types.

### Install

_TODO_: Make a real package on npmjs.

For now...

`npm pack` this lib up.

`npm install --save ../wherever/moar-types-1.0.0.tgz`

### Use

There are 2 main ways of getting these types in your project.

1. Import ALL typeDefs and resolvers:

```javascript
import * as MoarTypes from 'moar-types'

const mySchema = makeExecutableSchema({
	typeDefs: gql`
		${MoarTypes.typeDefs}
		${myApplicationTypeDefs}
	`,
	resolvers: {
		...MoarTypes.resolvers,
		...myApplicationResolvers
	}
})
```

2. Import individual typeDefs and resolvers:

```javascript
import { FormattedDuration } from 'moar-types'

const mySchema = makeExecutableSchema({
	typeDefs: gql`
		${FormattedDuration.typeDefs}
		${myApplicationTypeDefs}
	`,
	resolvers: {
		FormattedDuration: FormattedDuration.resolvers,
		...myApplicationResolvers
	}
})
```

Or if you don't use SDL+Resolvers

```javascript
import { FormattedDate } from 'moar-types'

const mySchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			twoHoursAgo: {
				type: new GraphQLNonNull(FormattedDate.FormattedDate),
				resolve: () => getTwoHoursAgo()
			}
		}
	})
})
```
