import gql from 'graphql-tag'

import * as Date from './date'
import * as FormattedDate from './formatted-date'
import * as FormattedDuration from './formatted-duration'

// export all typedefs together
export const typeDefs = gql`
	${Date.typeDefs}
	${FormattedDate.typeDefs}
	${FormattedDuration.typeDefs}
`

// export all resolvers together
export const resolvers = {
	Date: Date.scalar,
	FormattedDate: FormattedDate.resolvers,
	FormattedDuration: FormattedDuration.resolvers
}

// export each module individually
export { Date, FormattedDate, FormattedDuration }
