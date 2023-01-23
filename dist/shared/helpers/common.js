"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductPrices = exports.getLegacyEncodedQueryString = exports.applyCurrencyConversion = exports.sortRecentSeaches = exports.getRecentSearches = exports.formatSearchItem = exports.caseInsensitiveString = exports.removeRecentSearch = exports.recordRecentSearch = exports.getRequestParamsFromWindowLocation = exports.getRequestParamsFromQueryString = exports.getEncodedQueryString = exports.getURLEncodedQueryString = void 0;
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
var getProductPrices = function (productIds, countryCode) { return __awaiter(void 0, void 0, void 0, function () {
    var windowInstance, myShopifyDomain, storeFrontAPIAccessToken, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!productIds.length)
                    return [2 /*return*/, {}];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, loadTagalysHelperScript()];
            case 2:
                _a.sent();
                windowInstance = window;
                myShopifyDomain = configuration_1.default.getMyShopifyDomain();
                storeFrontAPIAccessToken = configuration_1.default.getStoreFrontAPIAccessToken();
                return [4 /*yield*/, windowInstance.TagalysPlatformHelpers.getProductPrices(productIds, countryCode, {
                        myShopifyDomain: myShopifyDomain,
                        storeFrontAPIAccessToken: storeFrontAPIAccessToken,
                        applyCurrencyConversion: applyCurrencyConversion
                    })];
            case 3:
                response = _a.sent();
                return [2 /*return*/, response];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                console.log("Issue in loading tagalys-platform-helpers");
                return [2 /*return*/, {}];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getProductPrices = getProductPrices;
function loadTagalysHelperScript() {
    var _window = window;
    if (_window.TagalysPlatformHelpers)
        return;
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = "https://storage.googleapis.com/tagalys-front-end-components/tagalys-platform-helpers-v1.0.0.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
//# sourceMappingURL=common.js.map