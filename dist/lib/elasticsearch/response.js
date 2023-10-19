"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchResponse = void 0;
var getSearchResponse = function (document, _a) {
    var body = _a.body;
    return ({
        documents: body.hits.hits.reduce(function (result, _a) {
            var source = _a._source;
            if (!source) {
                return result;
            }
            return __spreadArray(__spreadArray([], result, true), [Object.assign(new document(), source)], false);
        }, []),
        aggregations: (body.aggregations || {})
    });
};
exports.getSearchResponse = getSearchResponse;
//# sourceMappingURL=response.js.map