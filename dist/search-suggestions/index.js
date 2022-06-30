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
var SearchSuggestions = /** @class */ (function (_super) {
    __extends(SearchSuggestions, _super);
    function SearchSuggestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchSuggestions.prototype.getRequestOptions = function () {
        return {
            path: "ss",
            format: constants_1.REQUEST_FORMAT.JSON,
            params: {
                q: this.requestOptions.params.query,
                products: this.requestOptions.params.request.products,
                queries: this.requestOptions.params.request.queries
            },
        };
    };
    SearchSuggestions.exporterName = function () {
        return 'SearchSuggestions';
    };
    SearchSuggestions.prototype.extractAnalyticsData = function (response) {
        return response;
    };
    SearchSuggestions.prototype.formatResponse = function (response) {
        return this.responseFormatter.searchSuggestions(response, this.requestOptions.configuration);
    };
    SearchSuggestions.prototype.setQuery = function (query, callAPI) {
        if (callAPI === void 0) { callAPI = true; }
        this.requestOptions.params.query = query;
        callAPI && this.call(this.requestOptions);
    };
    SearchSuggestions.prototype.getHelpersToExpose = function () {
        var _this = this;
        return {
            setQuery: function (query, callAPI) {
                if (callAPI === void 0) { callAPI = true; }
                return _this.setQuery(query, callAPI);
            },
            getPopularSearches: function () { return _this.getPopularSearches(); },
            addRecentSearch: function (query) { return _this.addRecentSearch(query); },
            removeRecentSearch: function (query) { return _this.removeRecentSearch(query); },
            getRequestParamsFromQueryString: function (queryString) { return (0, common_1.getRequestParamsFromQueryString)(queryString); },
            getRequestParamsFromWindowLocation: function () { return (0, common_1.getRequestParamsFromWindowLocation)(); }
        };
    };
    SearchSuggestions.prototype.new = function (requestOptions) {
        this.requestOptions = requestOptions;
        return this.getHelpersToExpose();
    };
    SearchSuggestions.prototype.getPopularSearches = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var recentSearches = localStorage_1.default.getItem("tagalysRecentSearches") || { queries: [] };
            var popularSearches = new popular_searches_1.default();
            // TODO: A way to have configuration inside the popularSearches interface itself.
            popularSearches.fetchPopularSearches(_this.requestOptions.configuration).then(function (popularSearches) {
                // move slice value to constant
                resolve({
                    recentSearches: recentSearches.queries.slice(0, 5),
                    popularSearches: popularSearches.queries
                });
            });
        });
    };
    SearchSuggestions.prototype.addRecentSearch = function (displayString) {
        var recentSearches = localStorage_1.default.getItem("tagalysRecentSearches") || { queries: [] };
        recentSearches.queries = recentSearches.concat([displayString]);
        localStorage_1.default.setValue("tagalysRecentSearches", recentSearches, 3600000);
    };
    SearchSuggestions.prototype.removeRecentSearch = function (displayString) {
        var recentSearches = localStorage_1.default.getItem("tagalysPopularSearches") || { queries: [] };
        recentSearches.queries = recentSearches.queries.filter(function (recentSearch) { return recentSearch.displayString !== displayString; });
        localStorage_1.default.setValue("tagalysPopularSearches", recentSearches, 3600000);
    };
    SearchSuggestions.defaultRequestOptions = function () {
        return __assign(__assign({}, constants_1.DEFAULT_REQUEST_CALLBACKS), { configuration: {
                queryString: {
                    query: "q",
                    queryFilter: "qf"
                },
                categorySeperator: "▸",
                hierachySeperator: "->"
            } });
    };
    return SearchSuggestions;
}(apiConnector_1.default));
exports.default = SearchSuggestions;
//# sourceMappingURL=index.js.map