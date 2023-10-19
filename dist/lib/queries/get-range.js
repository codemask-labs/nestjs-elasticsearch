"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangeQuery = void 0;
var getRangeQuery = function (field, options) {
    var _a;
    return ({
        range: (_a = {}, _a[field] = options, _a)
    });
};
exports.getRangeQuery = getRangeQuery;
//# sourceMappingURL=get-range.js.map