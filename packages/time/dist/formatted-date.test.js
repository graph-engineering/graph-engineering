"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FormattedDate = __importStar(require("./formatted-date"));
var utils_1 = require("./utils");
describe('formatted duration', function () {
    var twoHoursAgoDate = new Date();
    twoHoursAgoDate.setHours(twoHoursAgoDate.getHours() - 2);
    test('that a basic case works', function () {
        return utils_1.expectSimpleObjectType(FormattedDate.FormattedDate, twoHoursAgoDate, "\n\t\t\t{\n\t\t\t\thumanized\n\t\t\t\tiso\n\t\t\t\tunix {\n\t\t\t\t\tseconds\n\t\t\t\t}\n\t\t\t\tformatted(template: \"YYYY-MM-DD\", timezone: \"GMT\")\n\t\t\t}").resolves.toEqual({
            humanized: '2 hours ago',
            iso: twoHoursAgoDate.toISOString(),
            unix: {
                seconds: twoHoursAgoDate.getTime() / 1000
            },
            formatted: twoHoursAgoDate.toISOString().slice(0, 10)
        });
    });
});
//# sourceMappingURL=formatted-date.test.js.map