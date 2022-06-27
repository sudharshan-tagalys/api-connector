"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("qs");
var QueryStringManager = /** @class */ (function () {
    function QueryStringManager() {
    }
    QueryStringManager.prototype.parse = function (params) {
        return qs.parse(params);
    };
    QueryStringManager.prototype.stringify = function (params) {
        return qs.stringify(params, { encode: false });
    };
    QueryStringManager.prototype.setConfiguration = function (configuration) {
        if (configuration === void 0) { configuration = {
            query: 'q',
            queryFilter: 'qf',
            filter: 'f',
            page: 'page',
            sort: 'sort'
        }; }
        this.configuration = configuration;
    };
    QueryStringManager.prototype.getConfiguration = function () {
        return this.configuration;
    };
    return QueryStringManager;
}());
exports.default = new QueryStringManager();
//# sourceMappingURL=queryStringManager.js.map