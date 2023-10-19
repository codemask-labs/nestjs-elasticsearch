"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangeAggregation = void 0;
var getRangeAggregation = function (field, ranges) { return ({
    range: {
        field: field,
        ranges: ranges
    }
}); };
exports.getRangeAggregation = getRangeAggregation;
//# sourceMappingURL=get-range.js.map