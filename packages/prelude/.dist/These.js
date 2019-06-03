"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var _1 = require(".");
__export(require("fp-ts/lib/These"));
exports.fromNullables = function (l, a) {
    return _1.These.fromOptions(_1.Option.fromNullable(l), _1.Option.fromNullable(a));
};
