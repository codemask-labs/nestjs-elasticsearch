"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPercentileAggregation = void 0;
var getPercentileAggregation = function (field, percents) { return ({
    percentiles: {
        field: field,
        percents: percents
    }
}); };
exports.getPercentileAggregation = getPercentileAggregation;
//# sourceMappingURL=get-percentile.js.map