import { encodeCursor } from './cursor'

export function makeConnection<
	T extends {
		id: string
	},
	K
>(
	items: Array<{ node: T; additionalEdgeProperties?: K }>,
	first?: number | null,
	after?: string | null
) {
	const itemsLength = items.length
	const itemsCopy = [...items]

	const indexOfGivenCursor = after
		? itemsCopy
				.map(item => item.node)
				.map(node => encodeCursor(node.id))
				.findIndex(item => item === after)
		: -1

	const startIndex = indexOfGivenCursor > -1 ? indexOfGivenCursor + 1 : 0
	const endIndex = first
		? Math.min(startIndex + first, itemsLength)
		: itemsLength

	return {
		totalCount: itemsLength,
		pageInfo: {
			hasNextPage: !!endIndex && itemsLength > endIndex,
			hasPreviousPage: startIndex > 0,
			startCursor: encodeCursor(items[startIndex].node.id),
			endCursor: encodeCursor(items[endIndex - 1].node.id)
		},
		edges: itemsCopy.slice(startIndex, endIndex).map(item => ({
			node: item.node,
			cursor: encodeCursor(item.node.id),
			...item.additionalEdgeProperties
		}))
	}
}
