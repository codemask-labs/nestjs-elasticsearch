"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateHistogramAggregation = void 0;
var getDateHistogramAggregation = function (field, interval) { return ({
    date_histogram: {
        field: field,
        calendar_interval: interval
    }
}); };
exports.getDateHistogramAggregation = getDateHistogramAggregation;
//# sourceMappingURL=get-date-histogram.js.map