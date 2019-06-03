"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var _1 = require(".");
var FP_1 = require("./FP");
__export(require("fp-ts/lib/TaskEither"));
exports.chain = _1.chained(_1.Either.either);
exports.runUnsafe = function (taskEither) { return taskEither.fold(FP_1.Fn.identity, FP_1.Fn.identity).run(); };
