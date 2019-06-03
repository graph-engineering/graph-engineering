"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var _1 = require(".");
__export(require("fp-ts/lib/Array"));
exports.fromHead = function (head) { return [head]; };
exports.nonNullables = function (as) {
    return as.reduce(function (as, a) { return _1.Option.fromNullable(a).fold(as, function (a) { return as.concat([a]); }); }, []);
};
exports.nullableCons = function (head, tail) {
    return _1.These.fromNullables(head, tail)
        .getOrElse(_1.These.that([]))
        .fold(exports.fromHead, _1.Fn.identity, exports.cons);
};
