import {
	graphql,
	GraphQLFieldResolver,
	GraphQLObjectType,
	GraphQLSchema
} from 'graphql'

import Moment from 'moment'

export const extractResolvers = (
	object: GraphQLObjectType
): { [fieldName: string]: GraphQLFieldResolver<any, any> } =>
	Object.entries(object.getFields()).reduce(
		(previous, [name, field]) => ({ ...previous, [name]: field.resolve }),
		{}
	)

export function expectSimpleObjectType(
	graphQLObjectType: GraphQLObjectType,
	value: any,
	queryString: string
): jest.Matchers<Promise<any>> {
	const schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: {
				arbitraryRootField: {
					type: graphQLObjectType,
					resolve: () => value
				}
			}
		})
	})

	return expect(
		graphql(
			schema,
			`
					{
						arbitraryRootField ${queryString}
					}
				`
		).then(response => {
			if (response.errors) throw new Error(response.errors[0].message)
			return response.data && response.data.arbitraryRootField
		})
	)
}

interface Occurrence<Kind extends OccurrenceKind> {
	kind: Kind
	start: Moment.Moment
}

const enum OccurrenceKind {
	Instant = 'Instant',
	OngoingInterval = 'OngoingInterval',
	StoppedInterval = 'StoppedInterval'
}

export type Instant = Occurrence<OccurrenceKind.Instant>
export type OngoingInterval = Occurrence<OccurrenceKind.OngoingInterval>
export type StoppedInterval = Occurrence<OccurrenceKind.StoppedInterval> & {
	stop: Moment.Moment
}

export type Time = Instant | OngoingInterval | StoppedInterval

export const duration = (time: Time): Moment.Duration =>
	Moment.duration(
		(isStoppedInterval(time) ? time.stop : Moment()).diff(time.start)
	).abs()

export const isStoppedInterval = (time: Time): time is StoppedInterval =>
	time.kind === 'StoppedInterval'

export const stoppedInterval = (
	start?: Moment.Moment | null,
	stop?: Moment.Moment | null
): StoppedInterval => toStoppedInterval(ongoingInterval(start), stop)

export const ongoingInterval = (
	start?: Moment.Moment | null
): OngoingInterval => ({
	...instant(start),
	kind: OccurrenceKind.OngoingInterval
})

export const instant = (start?: Moment.Moment | null): Instant => ({
	kind: OccurrenceKind.Instant,
	start: start || Moment()
})

export const toStoppedInterval = (
	time: Time,
	stop?: Moment.Moment | null
): StoppedInterval => ({
	...time,
	kind: OccurrenceKind.StoppedInterval,
	stop: stop || (isStoppedInterval(time) ? time.stop : Moment())
})

export const throwError = (error: Error) => {
	console.log(error)
	throw error
}
