"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchPhrasePrefixQuery = void 0;
var getMatchPhrasePrefixQuery = function (field, query, options) {
    var _a;
    return ({
        match_phrase_prefix: (_a = {}, _a[field] = __assign({ query: query }, options), _a)
    });
};
exports.getMatchPhrasePrefixQuery = getMatchPhrasePrefixQuery;
//# sourceMappingURL=get-match-phrase-prefix.js.map