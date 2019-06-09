import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	printType
} from 'graphql'
import Moment from 'moment-timezone'

import { FormattedDuration } from './formatted-duration'
import { extractResolvers } from './utils'

// TODO: I'm not immediately sure why this can't be used below.
// interface FormattedFieldArgs {
// 	template: string
// 	zone: string
// }

// TODO: If input is not millis, it would still work here. Should we fail? How?

export const FormattedDate = new GraphQLObjectType({
	name: 'FormattedDate',
	fields: () => ({
		unix: {
			type: new GraphQLNonNull(FormattedDuration),
			resolve: (millis: number) =>
				Moment.duration(new Date(millis).valueOf(), 'ms')
		},
		iso: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (millis: number) => new Date(millis).toISOString()
		},
		humanized: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (millis: number) => Moment(new Date(millis)).fromNow()
		},
		formatted: {
			type: new GraphQLNonNull(GraphQLString),
			args: {
				template: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (millis: number, args: any) =>
				Moment(new Date(millis))
					.tz(args.zone || 'UTC')
					.format(args.template)
		}
	})
})

export const resolvers = extractResolvers(FormattedDate)

export const typeDefs = printType(FormattedDate)
