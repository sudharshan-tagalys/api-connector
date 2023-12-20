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
var qs = require("qs");
var DEFAULT_QUERY_STRING_CONFIGURATION = {
    queryParameter: 'q',
    queryFilterParameter: 'qf',
    filterParameter: 'f',
    pageParameter: 'page',
    sortParameter: 'sort'
};
var QueryStringManager = /** @class */ (function () {
    function QueryStringManager() {
        this.configuration = DEFAULT_QUERY_STRING_CONFIGURATION;
    }
    QueryStringManager.prototype.parse = function (params) {
        return qs.parse(params);
    };
    QueryStringManager.prototype.stringify = function (params) {
        return qs.stringify(params, { encode: true });
    };
    QueryStringManager.prototype.setConfiguration = function (configuration) {
        this.configuration = __assign(__assign({}, DEFAULT_QUERY_STRING_CONFIGURATION), configuration);
    };
    QueryStringManager.prototype.getConfiguration = function () {
        return this.configuration;
    };
    return QueryStringManager;
}());
exports.default = new QueryStringManager();
//# sourceMappingURL=queryStringManager.js.map