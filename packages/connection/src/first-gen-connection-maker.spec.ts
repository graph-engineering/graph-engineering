import { encodeCursor } from './cursor'
import { makeConnection } from './first-gen-connection-maker'

describe('first gen connection maker', () => {
	const items = 'abcdefghijklmnop'
		.split('')
		.map(char => ({ id: char }))
		.map(node => ({ node, additionalEdgeProperties: {} }))
	const cursors = items.map(item => encodeCursor(item.node.id))

	it('should return 3 items when you put in first 3', () => {
		expect(items.length).not.toEqual(3)
		expect(makeConnection(items, 3).edges).toHaveLength(3)
	})

	it('should have the correct pageInfo when starting at beginning and getting 3', () => {
		const first = 3
		expect(makeConnection(items, 3).pageInfo).toEqual({
			startCursor: cursors[0],
			endCursor: cursors[first - 1],
			hasNextPage: true,
			hasPreviousPage: false
		})
	})

	it('should have the correct pageInfo when getting everything', () => {
		expect(makeConnection(items).pageInfo).toEqual({
			startCursor: cursors[0],
			endCursor: cursors[cursors.length - 1],
			hasNextPage: false,
			hasPreviousPage: false
		})
	})

	it('should have the correct pageInfo when getting a middle page', () => {
		const page = makeConnection(items)
		const afterIndex = 2
		const after = page.edges[afterIndex].cursor
		const first = 3

		expect(makeConnection(items, first, after).pageInfo).toEqual({
			startCursor: cursors[afterIndex + 1],
			endCursor: cursors[afterIndex + first],
			hasNextPage: true,
			hasPreviousPage: true
		})
	})

	it('should work even when the array is empty', () => {
		expect(makeConnection([], 3).pageInfo).toEqual({
			startCursor: null,
			endCursor: null,
			hasNextPage: false,
			hasPreviousPage: false
		})
	})
})
