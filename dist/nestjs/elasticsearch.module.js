"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchModule = void 0;
var elasticsearch_1 = require("@nestjs/elasticsearch");
var common_1 = require("@nestjs/common");
var constants_1 = require("../lib/constants");
var injectables_1 = require("./injectables");
var elasticsearch_service_1 = require("./elasticsearch.service");
var utils_1 = require("./utils");
var ElasticsearchModule = (function () {
    function ElasticsearchModule() {
    }
    ElasticsearchModule_1 = ElasticsearchModule;
    ElasticsearchModule.register = function (options) {
        return {
            global: true,
            module: ElasticsearchModule_1,
            imports: [elasticsearch_1.ElasticsearchModule.register(options)],
            providers: [elasticsearch_service_1.ElasticsearchService],
            exports: [elasticsearch_service_1.ElasticsearchService]
        };
    };
    ElasticsearchModule.forFeature = function (documents) {
        var providers = documents.map(function (document) {
            var index = Reflect.getMetadata(constants_1.ELASTICSEARCH_INDEX_NAME_METADATA, document);
            if (!index) {
                throw new Error("Class (".concat(document.toString(), ") is not registered with @RegisterIndex(name: string) decorator!"));
            }
            return {
                inject: [elasticsearch_service_1.ElasticsearchService],
                provide: (0, utils_1.getIndexInjectionToken)(index),
                useFactory: function (service) { return new injectables_1.Index(service, document); }
            };
        });
        return {
            module: ElasticsearchModule_1,
            providers: providers,
            exports: providers
        };
    };
    var ElasticsearchModule_1;
    ElasticsearchModule = ElasticsearchModule_1 = __decorate([
        (0, common_1.Module)({})
    ], ElasticsearchModule);
    return ElasticsearchModule;
}());
exports.ElasticsearchModule = ElasticsearchModule;
//# sourceMappingURL=elasticsearch.module.js.map