"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterIndex = void 0;
var constants_1 = require("../constants");
var RegisterIndex = function (name) { return function (constructor) {
    Reflect.defineMetadata(constants_1.ELASTICSEARCH_INDEX_NAME_METADATA, name, constructor);
    return constructor;
}; };
exports.RegisterIndex = RegisterIndex;
//# sourceMappingURL=register-index.decorator.js.map