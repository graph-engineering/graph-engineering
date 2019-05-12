"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FormattedDuration = __importStar(require("./formatted-duration"));
var utils_1 = require("./utils");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
describe('formatted duration', function () {
    var ten = moment_timezone_1.default.duration(5, 'minutes');
    test('that a basic case works', function () {
        return utils_1.expectSimpleObjectType(FormattedDuration.FormattedDuration, ten, "{\n        humanized\n        milliseconds\n        seconds\n        minutes\n        hours\n        days\n        weeks\n        months\n        years\n\t\t\t}").resolves.toEqual({
            days: 0.003472222222222222,
            hours: 0.08333333333333333,
            humanized: '5 minutes',
            milliseconds: 300000,
            minutes: 5,
            months: 0.00011407945862452114,
            seconds: 300,
            weeks: 0.000496031746031746,
            years: 0.000009506621552043427
        });
    });
});
//# sourceMappingURL=formatted-duration.test.js.map