"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestParamsFromWindowLocation = exports.getRequestParamsFromQueryString = exports.getEncodedQueryString = exports.getURLEncodedQueryString = void 0;
var queryStringManager_1 = require("../../lib/queryStringManager");
var getURLEncodedQueryString = function (baseUrl, params) {
    return "".concat(baseUrl).concat(getEncodedQueryString(params));
};
exports.getURLEncodedQueryString = getURLEncodedQueryString;
var getEncodedQueryString = function (_a) {
    var _b = _a.query, query = _b === void 0 ? '' : _b, _c = _a.queryFilter, queryFilter = _c === void 0 ? {} : _c, _d = _a.filter, filter = _d === void 0 ? {} : _d, _e = _a.page, page = _e === void 0 ? null : _e, _f = _a.sort, sort = _f === void 0 ? null : _f, _g = _a.except, except = _g === void 0 ? [] : _g;
    var _h = queryStringManager_1.default.getConfiguration(), queryReplacement = _h.queryParameter, queryFilterReplacement = _h.queryFilterParameter, filterReplacement = _h.filterParameter, pageReplacement = _h.pageParameter, sortReplacement = _h.sortParameter;
    var params = {};
    if (query.length) {
        params[queryReplacement] = query;
    }
    var hasQueryFilters = (Object.keys(queryFilter).length !== 0);
    var hasFilters = (Object.keys(filter).length !== 0);
    if (hasQueryFilters) {
        params[queryFilterReplacement] = getFilterQueryString(queryFilter);
    }
    if (hasFilters) {
        params[filterReplacement] = getFilterQueryString(filter);
    }
    if (page) {
        params[pageReplacement] = page;
    }
    if (sort.length) {
        params[sortReplacement] = sort;
    }
    except.forEach(function (paramToDelete) {
        delete params[getReplacementParam(paramToDelete)];
    });
    return "?".concat(queryStringManager_1.default.stringify(params));
};
exports.getEncodedQueryString = getEncodedQueryString;
var getReplacementParam = function (param) {
    var replacementParams = queryStringManager_1.default.getConfiguration();
    return replacementParams[param];
};
var getRequestParamsFromWindowLocation = function () {
    return getRequestParamsFromQueryString(window.location.search.replace("?", ''));
};
exports.getRequestParamsFromWindowLocation = getRequestParamsFromWindowLocation;
var getRequestParamsFromQueryString = function (queryString) {
    var parsedObjectFromQueryString = queryStringManager_1.default.parse(queryString);
    var _a = queryStringManager_1.default.getConfiguration(), queryParameter = _a.queryParameter, queryFilterParameter = _a.queryFilterParameter, filterParameter = _a.filterParameter, pageParameter = _a.pageParameter, sortParameter = _a.sortParameter;
    var params = {};
    if (parsedObjectFromQueryString[queryParameter]) {
        params['query'] = parsedObjectFromQueryString[queryParameter];
    }
    if (parsedObjectFromQueryString[queryFilterParameter]) {
        params['queryFilter'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilterParameter]);
    }
    if (parsedObjectFromQueryString[filterParameter]) {
        params['filters'] = getFiltersFromQueryString(parsedObjectFromQueryString[filterParameter]);
    }
    if (parsedObjectFromQueryString[pageParameter]) {
        params['page'] = parseInt(parsedObjectFromQueryString[pageParameter].toString());
    }
    if (parsedObjectFromQueryString[sortParameter]) {
        params['sort'] = parsedObjectFromQueryString[sortParameter];
    }
    return params;
};
exports.getRequestParamsFromQueryString = getRequestParamsFromQueryString;
var getFilterQueryString = function (filter) {
    var filtersQueryStrings = [];
    Object.keys(filter).forEach(function (key) {
        if (Array.isArray(filter[key]) && filter[key].length) {
            filtersQueryStrings.push("".concat(key, "-").concat(filter[key].join(',')));
        }
        else {
            filtersQueryStrings.push("".concat(key, "-").concat(filter[key].selected_min, "-").concat(filter[key].selected_max));
        }
    });
    return filtersQueryStrings.join('~');
};
var getFiltersFromQueryString = function (filterQueryString) {
    var filtersFromQueryString = filterQueryString.split("~");
    var filters = {};
    filtersFromQueryString.forEach(function (filterFromQueryString) {
        var filter = filterFromQueryString.split('-');
        var isRangeFilter = (filter.length === 3);
        var filterKey = filter[0];
        if (isRangeFilter) {
            filters[filterKey] = {
                selected_min: filter[1],
                selected_max: filter[2]
            };
        }
        else {
            var filterValueString = filter[1];
            var appliedFilterValues = filterValueString.split(',');
            if (appliedFilterValues.length) {
                filters[filterKey] = appliedFilterValues;
            }
        }
    });
    return filters;
};
//# sourceMappingURL=common.js.map