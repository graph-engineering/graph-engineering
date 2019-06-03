"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var _1 = require(".");
__export(require("fp-ts/lib/Identity"));
exports.it = function (value) {
    return new _1.Identity.Identity(value);
};
