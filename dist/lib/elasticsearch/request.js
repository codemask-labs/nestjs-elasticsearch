"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchRequest = void 0;
var getSearchRequest = function (index, options) {
    var _a = options || {}, size = _a.size, from = _a.from, query = _a.query, aggregations = _a.aggregations;
    return {
        index: index,
        size: size,
        from: from,
        body: {
            query: query || {},
            aggregations: aggregations || {}
        }
    };
};
exports.getSearchRequest = getSearchRequest;
//# sourceMappingURL=request.js.map