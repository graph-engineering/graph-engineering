"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var Option = require("fp-ts/lib/Option");
var _1 = require(".");
__export(require("fp-ts/lib/Option"));
exports.chain = _1.chained(Option.option);
exports.merge = function (first, second, merge) {
    return _1.These.fromOptions(first, second).map(function (these) {
        return these.fold(_1.Fn.identity, _1.Fn.identity, merge);
    });
};
