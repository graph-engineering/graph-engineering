"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var cursor_1 = require("./cursor");
function makeConnection(items, first, after) {
    var itemsLength = items.length;
    var itemsCopy = items.slice();
    var indexOfGivenCursor = after
        ? itemsCopy
            .map(function (item) { return item.node; })
            .map(function (node) { return cursor_1.encodeCursor(node.id); })
            .findIndex(function (item) { return item === after; })
        : -1;
    var startIndex = indexOfGivenCursor > -1 ? indexOfGivenCursor + 1 : 0;
    var endIndex = first
        ? Math.min(startIndex + first, itemsLength)
        : itemsLength;
    return {
        totalCount: itemsLength,
        pageInfo: {
            hasNextPage: !!endIndex && itemsLength > endIndex,
            hasPreviousPage: startIndex > 0,
            startCursor: cursor_1.encodeCursor(items[startIndex].node.id),
            endCursor: cursor_1.encodeCursor(items[endIndex - 1].node.id)
        },
        edges: itemsCopy.slice(startIndex, endIndex).map(function (item) { return (__assign({ node: item.node, cursor: cursor_1.encodeCursor(item.node.id) }, item.additionalEdgeProperties)); })
    };
}
exports.makeConnection = makeConnection;
//# sourceMappingURL=first-gen-connection-maker.js.map