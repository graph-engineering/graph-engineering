"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var Either = require("fp-ts/lib/Either");
var _1 = require(".");
__export(require("fp-ts/lib/Either"));
exports.tryCatch = Either.tryCatch2v;
exports.chain = _1.chained(Either.either);
