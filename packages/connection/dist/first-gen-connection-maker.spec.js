"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cursor_1 = require("./cursor");
var first_gen_connection_maker_1 = require("./first-gen-connection-maker");
describe('first gen connection maker', function () {
    var items = 'abcdefghijklmnop'
        .split('')
        .map(function (char) { return ({ id: char }); })
        .map(function (node) { return ({ node: node }); });
    var cursors = items.map(function (item) { return cursor_1.encodeCursor(item.node.id); });
    it('should return 3 items when you put in first 3', function () {
        expect(items.length).not.toEqual(3);
        expect(first_gen_connection_maker_1.makeConnection(items, 3).edges).toHaveLength(3);
    });
    it('should have the correct pageInfo when starting at beginning and getting 3', function () {
        var first = 3;
        expect(first_gen_connection_maker_1.makeConnection(items, 3).pageInfo).toEqual({
            startCursor: cursors[0],
            endCursor: cursors[first - 1],
            hasNextPage: true,
            hasPreviousPage: false
        });
    });
    it('should have the correct pageInfo when getting everything', function () {
        expect(first_gen_connection_maker_1.makeConnection(items).pageInfo).toEqual({
            startCursor: cursors[0],
            endCursor: cursors[cursors.length - 1],
            hasNextPage: false,
            hasPreviousPage: false
        });
    });
    it('should have the correct pageInfo when getting a middle page', function () {
        var page = first_gen_connection_maker_1.makeConnection(items);
        var afterIndex = 2;
        var after = page.edges[afterIndex].cursor;
        var first = 3;
        expect(first_gen_connection_maker_1.makeConnection(items, first, after).pageInfo).toEqual(expect.objectContaining({
            startCursor: cursors[afterIndex + 1],
            endCursor: cursors[afterIndex + first],
            hasNextPage: true,
            hasPreviousPage: true
        }));
    });
});
//# sourceMappingURL=first-gen-connection-maker.spec.js.map