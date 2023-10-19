"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectIndex = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("../constants");
var utils_1 = require("../../nestjs/utils");
var InjectIndex = function (document) {
    var index = Reflect.getMetadata(constants_1.ELASTICSEARCH_INDEX_NAME_METADATA, document);
    if (!index) {
        throw new Error('Failed to find registered catalog index');
    }
    return (0, common_1.Inject)((0, utils_1.getIndexInjectionToken)(index));
};
exports.InjectIndex = InjectIndex;
//# sourceMappingURL=inject-index.decorator.js.map