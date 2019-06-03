"use strict";
exports.__esModule = true;
var ms_1 = require("ms");
var _1 = require(".");
exports.millisecond = 1;
exports.second = exports.millisecond * 1000;
exports.minute = exports.second * 60;
exports.hour = exports.minute * 60;
exports.day = exports.hour * 24;
exports.toEnglishShort = function (time) {
    return _1.Either.tryCatch(function () { return ms_1["default"](time); }, _1.Exception.unknown);
};
exports.toEnglishLong = function (time) {
    return _1.Either.tryCatch(function () { return ms_1["default"](time, { long: true }); }, _1.Exception.unknown);
};
exports.fromEnglish = function (english) {
    return _1.Either.tryCatch(function () { return ms_1["default"](english); }, _1.Exception.unknown).refineOrElse(function (time) {
        return time !== undefined &&
            time !== null &&
            !Number.isNaN(time) &&
            Number.isFinite(time);
    }, Error("`" + english + "` cannot be converted into milliseconds"));
};
