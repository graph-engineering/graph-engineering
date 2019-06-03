"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var Do_1 = require("fp-ts-contrib/lib/Do");
exports.chained = Do_1.Do;
var Either = require("./Either");
exports.Either = Either;
var Exception = require("./Exception");
exports.Exception = Exception;
var Identity = require("./Identity");
exports.Identity = Identity;
var JSON = require("./JSON");
exports.JSON = JSON;
var Option = require("./Option");
exports.Option = Option;
var ReadonlyArray = require("./ReadonlyArray");
exports.ReadonlyArray = ReadonlyArray;
var Runtime = require("./Runtime");
exports.Runtime = Runtime;
var TaskEither = require("./TaskEither");
exports.TaskEither = TaskEither;
var These = require("./These");
exports.These = These;
var Time = require("./Time");
exports.Time = Time;
__export(require("./FP"));
exports.property = function (propertyName) { return function (object) { return object[propertyName]; }; };
