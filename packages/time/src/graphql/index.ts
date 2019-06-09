import gql from 'graphql-tag'

import * as FormattedDate from './formatted-date'
import * as FormattedDuration from './formatted-duration'

// export all typedefs together
export const typeDefs = gql`
	scalar GraphengMS

	${FormattedDate.typeDefs}
	${FormattedDuration.typeDefs}
`

// export all resolvers together
export const resolvers = {
	FormattedDate: FormattedDate.resolvers,
	FormattedDuration: FormattedDuration.resolvers
}

// export each module individually
export { FormattedDate, FormattedDuration }
