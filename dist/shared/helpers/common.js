"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncodedQueryString = exports.getUrlEncodedQueryString = void 0;
var queryStringManager_1 = require("../../lib/queryStringManager");
var getUrlEncodedQueryString = function (baseUrl, params) {
    return "".concat(baseUrl).concat(getEncodedQueryString(params));
};
exports.getUrlEncodedQueryString = getUrlEncodedQueryString;
var getEncodedQueryString = function (_a) {
    var _b = _a.query, query = _b === void 0 ? '' : _b, _c = _a.queryFilter, queryFilter = _c === void 0 ? {} : _c, _d = _a.filter, filter = _d === void 0 ? {} : _d;
    var _e = queryStringManager_1.default.getConfiguration(), queryReplacement = _e.query, queryFilterReplacement = _e.queryFilter, filterReplacement = _e.filter;
    var params = {};
    if (query.length) {
        params[queryReplacement] = query;
    }
    var hasQueryFilters = (Object.keys(queryFilter).length !== 0);
    var hasFilters = (Object.keys(filter).length !== 0);
    if (hasQueryFilters) {
        var queryFilterValue = Object.keys(queryFilter).map(function (key) {
            return "".concat(encodeURIComponent(key), "-").concat(encodeURIComponent(queryFilter[key]));
        }).join('~');
        params[queryFilterReplacement] = queryFilterValue;
    }
    if (hasFilters) {
        params[filterReplacement] = filter;
    }
    console.log(queryStringManager_1.default.stringify(params), params);
    return '?' + queryStringManager_1.default.stringify(params);
};
exports.getEncodedQueryString = getEncodedQueryString;
//# sourceMappingURL=common.js.map