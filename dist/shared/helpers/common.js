"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLegacyEncodedQueryString = exports.applyCurrencyConversion = exports.sortRecentSeaches = exports.getRecentSearches = exports.formatSearchItem = exports.caseInsensitiveString = exports.removeRecentSearch = exports.recordRecentSearch = exports.getRequestParamsFromWindowLocation = exports.getRequestParamsFromQueryString = exports.getEncodedQueryString = exports.getURLEncodedQueryString = void 0;
var configuration_1 = require("../../lib/configuration");
var localStorage_1 = require("../../lib/localStorage");
var queryStringManager_1 = require("../../lib/queryStringManager");
var getURLEncodedQueryString = function (baseUrl, params) {
    return "".concat(baseUrl, "?").concat(getEncodedQueryString(params));
};
exports.getURLEncodedQueryString = getURLEncodedQueryString;
var getLegacyEncodedQueryString = function (_a) {
    var _b = _a.query, query = _b === void 0 ? '' : _b, _c = _a.queryFilters, queryFilters = _c === void 0 ? {} : _c, _d = _a.filters, filters = _d === void 0 ? {} : _d, _e = _a.page, page = _e === void 0 ? null : _e, _f = _a.sort, sort = _f === void 0 ? null : _f, _g = _a.except, except = _g === void 0 ? [] : _g;
    var _h = queryStringManager_1.default.getConfiguration(), queryReplacement = _h.queryParameter, queryFilterReplacement = _h.queryFilterParameter, filterReplacement = _h.filterParameter, pageReplacement = _h.pageParameter, sortReplacement = _h.sortParameter;
    var params = {};
    if (query.length) {
        params[queryReplacement] = query;
    }
    var hasQueryFilters = (Object.keys(queryFilters).length !== 0);
    var hasFilters = (Object.keys(filters).length !== 0);
    if (hasQueryFilters) {
        params[queryFilterReplacement] = getFilterQueryString(queryFilters);
    }
    if (hasFilters) {
        params[filterReplacement] = getFilterQueryString(filters);
    }
    if (page) {
        params[pageReplacement] = page;
    }
    if (sort && sort.length) {
        params[sortReplacement] = sort;
    }
    except.forEach(function (paramToDelete) {
        delete params[getReplacementParam(paramToDelete)];
    });
    return "".concat(queryStringManager_1.default.stringify(params));
};
exports.getLegacyEncodedQueryString = getLegacyEncodedQueryString;
var getEncodedQueryString = function (_a) {
    var _b = _a.query, query = _b === void 0 ? '' : _b, _c = _a.queryFilters, queryFilters = _c === void 0 ? {} : _c, _d = _a.filters, filters = _d === void 0 ? {} : _d, _e = _a.page, page = _e === void 0 ? null : _e, _f = _a.sort, sort = _f === void 0 ? null : _f, _g = _a.except, except = _g === void 0 ? [] : _g;
    var _h = queryStringManager_1.default.getConfiguration(), queryReplacement = _h.queryParameter, queryFilterReplacement = _h.queryFilterParameter, filterReplacement = _h.filterParameter, pageReplacement = _h.pageParameter, sortReplacement = _h.sortParameter;
    var params = {};
    if (query.length) {
        params[queryReplacement] = query;
    }
    var hasQueryFilters = (Object.keys(queryFilters).length !== 0);
    var hasFilters = (Object.keys(filters).length !== 0);
    if (hasQueryFilters) {
        params[queryFilterReplacement] = getQueryFilterQueryString(queryFilters);
    }
    if (hasFilters) {
        params[filterReplacement] = getFilterQueryString(filters);
    }
    if (page) {
        params[pageReplacement] = page;
    }
    if (sort && sort.length) {
        params[sortReplacement] = sort;
    }
    except.forEach(function (paramToDelete) {
        delete params[getReplacementParam(paramToDelete)];
    });
    return "".concat(queryStringManager_1.default.stringify(params));
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
    var parsedObjectFromQueryString = queryStringManager_1.default.parse(queryString.replace("?", ''));
    var _a = queryStringManager_1.default.getConfiguration(), queryParameter = _a.queryParameter, queryFilterParameter = _a.queryFilterParameter, filterParameter = _a.filterParameter, pageParameter = _a.pageParameter, sortParameter = _a.sortParameter;
    var params = {};
    if (parsedObjectFromQueryString[queryParameter]) {
        params['query'] = parsedObjectFromQueryString[queryParameter];
    }
    if (parsedObjectFromQueryString[queryFilterParameter]) {
        params['queryFilters'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilterParameter]);
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
var getQueryFilterQueryString = function (filters) {
    var filtersQueryStrings = [];
    Object.keys(filters).forEach(function (key) {
        filtersQueryStrings.push("".concat(key, "-").concat(filters[key]));
    });
    return filtersQueryStrings.join('~');
};
var getFilterQueryString = function (filters) {
    var filtersQueryStrings = [];
    Object.keys(filters).forEach(function (key) {
        if (Array.isArray(filters[key]) && filters[key].length) {
            filtersQueryStrings.push("".concat(key, "-").concat(filters[key].join(',')));
        }
        else {
            filtersQueryStrings.push("".concat(key, "-").concat(filters[key].selected_min, "-").concat(filters[key].selected_max));
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
var caseInsensitiveString = function (string) {
    return string.toLowerCase().trim();
};
exports.caseInsensitiveString = caseInsensitiveString;
var sortRecentSeaches = function (arr) {
    arr.sort(function (a, b) {
        var keyA = new Date(a.expiry), keyB = new Date(b.expiry);
        // Compare the 2 dates
        if (keyA < keyB)
            return 1;
        if (keyA > keyB)
            return -1;
        return 0;
    });
    return arr;
};
exports.sortRecentSeaches = sortRecentSeaches;
var getRecentSearches = function () {
    var tagalysRecentSearches = localStorage_1.default.getItem('tagalysRecentSearches');
    if (tagalysRecentSearches) {
        tagalysRecentSearches.queries = tagalysRecentSearches.queries.filter(function (recentSearch) {
            return (localStorage_1.default.getCurrentTime() <= recentSearch.expiry);
        });
        localStorage_1.default.setValue('tagalysRecentSearches', tagalysRecentSearches);
        return tagalysRecentSearches;
    }
    return {
        queries: []
    };
};
exports.getRecentSearches = getRecentSearches;
var recordRecentSearch = function (queryString) {
    var requestParams = getRequestParamsFromQueryString(queryString.replace("?", ""));
    removeRecentSearch(queryString);
    var recentSearches = getRecentSearches();
    recentSearches.queries = recentSearches.queries.concat([{
            displayString: requestParams.query,
            queryString: getEncodedQueryString({
                query: requestParams.query,
                queryFilters: requestParams.queryFilters
            }),
            expiry: (localStorage_1.default.getCurrentTime() + 3600000)
        }]);
    localStorage_1.default.setValue("tagalysRecentSearches", recentSearches);
};
exports.recordRecentSearch = recordRecentSearch;
var removeRecentSearch = function (queryString) {
    var requestParams = getRequestParamsFromQueryString(queryString.replace("?", ""));
    var requiredQueryString = getEncodedQueryString({
        query: requestParams.query,
        queryFilters: requestParams.queryFilters
    });
    var recentSearches = getRecentSearches();
    recentSearches.queries = recentSearches.queries.filter(function (recentSearch) { return caseInsensitiveString(recentSearch.queryString) !== caseInsensitiveString(requiredQueryString); });
    localStorage_1.default.setValue("tagalysRecentSearches", recentSearches);
};
exports.removeRecentSearch = removeRecentSearch;
var formatSearchItem = function (searchItem) {
    var item = {
        displayString: searchItem.displayString,
        queryString: searchItem.queryString,
    };
    if (searchItem.hasOwnProperty('rawQuery')) {
        item['rawQuery'] = searchItem.rawQuery;
    }
    return item;
};
exports.formatSearchItem = formatSearchItem;
var applyCurrencyConversion = function (number) {
    var exchangeRate = configuration_1.default.getExchangeRate();
    var fractionalDigits = configuration_1.default.getFractionalDigits();
    var convertedNumber = number * exchangeRate;
    convertedNumber = Math.round(convertedNumber * Math.pow(10, fractionalDigits)) / Math.pow(10, fractionalDigits);
    return convertedNumber;
};
exports.applyCurrencyConversion = applyCurrencyConversion;
//# sourceMappingURL=common.js.map