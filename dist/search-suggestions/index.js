"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var apiConnector_1 = require("../lib/apiConnector");
var constants_1 = require("../shared/constants");
var localStorage_1 = require("../lib/localStorage");
var popular_searches_1 = require("../popular-searches");
var common_1 = require("../shared/helpers/common");
var debounce_1 = require("../lib/debounce");
var SearchSuggestions = /** @class */ (function (_super) {
    __extends(SearchSuggestions, _super);
    function SearchSuggestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchSuggestions.prototype.getRequestOptions = function () {
        return {
            path: "ss",
            format: constants_1.REQUEST_FORMAT.JSON,
            params: __assign(__assign({ q: this.requestOptions.params.query }, SearchSuggestions.defaultRequestOptions().params.request), { products: this.requestOptions.params.request.products, queries: this.requestOptions.params.request.queries }),
        };
    };
    SearchSuggestions.exporterName = function () {
        return "SearchSuggestions";
    };
    SearchSuggestions.prototype.extractAnalyticsData = function (response) {
        return false;
    };
    SearchSuggestions.prototype.formatResponse = function (response) {
        return this.responseFormatter.searchSuggestions(response, this.requestOptions.configuration);
    };
    SearchSuggestions.prototype.updateQuery = function (query) {
        this.requestOptions.params.query = query;
        this.call(this.requestOptions);
    };
    SearchSuggestions.prototype.setQuery = function (query) {
        this.requestOptions.params.query = query;
    };
    SearchSuggestions.prototype.getHelpersToExpose = function () {
        var _this = this;
        var queryStringHelpers = {
            getRequestParamsFromQueryString: function (queryString) {
                return (0, common_1.getRequestParamsFromQueryString)(queryString);
            },
            getRequestParamsFromWindowLocation: function () {
                return (0, common_1.getRequestParamsFromWindowLocation)();
            },
            getURLEncodedQueryString: function (baseUrl, params) {
                return (0, common_1.getURLEncodedQueryString)(baseUrl, params);
            },
        };
        return __assign({ updateQuery: (0, debounce_1.default)(function (query) { return _this.updateQuery(query); }), recordRecentSearch: function (queryString) { return (0, common_1.recordRecentSearch)(queryString); }, removeRecentSearch: function (queryString) { return (0, common_1.removeRecentSearch)(queryString); }, getRecentSearches: function (limit) { return _this.getRecentSearches(limit); }, getPopularSearches: function (limit) { return _this.getPopularSearches(limit); }, getRecentAndPopularSearches: function (maxRecentSearches, maxTotalSearches, callbackOptions) {
                if (callbackOptions === void 0) { callbackOptions = {}; }
                return _this.getRecentAndPopularSearches(maxRecentSearches, maxTotalSearches, callbackOptions);
            }, getEncodedQueryString: function (queryParams) { return (0, common_1.getEncodedQueryString)(queryParams); }, getRequestParamsFromQueryString: function (queryString) { return (0, common_1.getRequestParamsFromQueryString)(queryString); }, setQuery: function (query) { return _this.setQuery(query); } }, queryStringHelpers);
    };
    SearchSuggestions.prototype.new = function (requestOptions) {
        this.requestOptions = requestOptions;
        return this.getHelpersToExpose();
    };
    SearchSuggestions.prototype.getSearchesToDisplay = function (recentSearches, popularSearches, maxRecentSearches, maxTotalSearches) {
        var popularSearchesDisplayStrings = popularSearches.map(function (popularSearch) {
            return (0, common_1.caseInsensitiveString)(popularSearch.displayString);
        });
        var commonSearches = recentSearches
            .filter(function (query) {
            return popularSearchesDisplayStrings.includes((0, common_1.caseInsensitiveString)(query.displayString));
        })
            .map(function (query) { return (0, common_1.caseInsensitiveString)(query.displayString); });
        var popularSearchesWithoutCommonSearches = popularSearches.filter(function (query) {
            return !commonSearches.includes((0, common_1.caseInsensitiveString)(query.displayString));
        });
        var recentSearchesToDisplay = recentSearches
            .slice(0, maxRecentSearches)
            .map(function (searchItem) {
            return __assign(__assign({}, searchItem), { type: "recent" });
        });
        var popularSearchesToDisplay = popularSearchesWithoutCommonSearches.map(function (searchItem) {
            return __assign(__assign({}, searchItem), { type: "popular" });
        });
        return (0, common_1.sortRecentSeaches)(recentSearchesToDisplay)
            .concat(popularSearchesToDisplay)
            .slice(0, maxTotalSearches);
    };
    SearchSuggestions.prototype.getRecentAndPopularSearches = function (maxRecentSearches, maxTotalSearches, callbackOptions) {
        var _this = this;
        if (callbackOptions === void 0) { callbackOptions = {}; }
        return new Promise(function (resolve, reject) {
            var recentSearches = localStorage_1.default.getItem("tagalysRecentSearches") || {
                queries: [],
            };
            var popularSearches = new popular_searches_1.default();
            popularSearches
                .fetchPopularSearches(_this.requestOptions.configuration, callbackOptions)
                .then(function (popularSearches) {
                var searchesToDisplay = _this.getSearchesToDisplay(recentSearches.queries, popularSearches.queries, maxRecentSearches, maxTotalSearches);
                resolve({
                    recentSearches: searchesToDisplay.filter(function (searchItem) { return searchItem.type === "recent"; }).map(common_1.formatSearchItem),
                    popularSearches: searchesToDisplay.filter(function (searchItem) { return searchItem.type === "popular"; }).map(common_1.formatSearchItem),
                });
            });
        });
    };
    SearchSuggestions.prototype.getPopularSearches = function (limit) {
        var _this = this;
        return new Promise(function (resolve, _) {
            var popularSearches = new popular_searches_1.default();
            popularSearches
                .fetchPopularSearches(_this.requestOptions.configuration)
                .then(function (popularSearches) {
                resolve(popularSearches.queries.slice(0, limit));
            });
        });
    };
    SearchSuggestions.prototype.getRecentSearches = function (limit) {
        var recentSearches = (0, common_1.getRecentSearches)();
        var sortedRecentSearches = (0, common_1.sortRecentSeaches)(recentSearches.queries);
        return sortedRecentSearches.slice(0, limit);
    };
    SearchSuggestions.defaultRequestOptions = function () {
        return __assign(__assign({}, constants_1.DEFAULT_REQUEST_CALLBACKS), { params: {
                request: {
                    products: 10,
                    queries: 10,
                },
            }, configuration: {
                categorySeparator: "▸",
                hierarchySeparator: "➜",
            } });
    };
    return SearchSuggestions;
}(apiConnector_1.default));
exports.default = SearchSuggestions;
//# sourceMappingURL=index.js.map