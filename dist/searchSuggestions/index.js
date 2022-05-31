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
var SearchSuggestions = /** @class */ (function (_super) {
    __extends(SearchSuggestions, _super);
    function SearchSuggestions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchSuggestions.prototype.getRequestOptions = function () {
        return {
            path: "ss",
            params: {
                q: this.requestOptions.params.query,
                products: this.requestOptions.params.request.products,
                queries: this.requestOptions.params.request.queries
            },
        };
    };
    SearchSuggestions.prototype.extractAnalyticsData = function (response) {
        return response;
    };
    SearchSuggestions.prototype.onSuccessfulResponse = function (response) {
        this.requestOptions.onSuccess(this.responseFormatter.searchSuggestions(response, this.requestOptions.configuration));
    };
    SearchSuggestions.prototype.formatRequestParams = function (params) {
        return JSON.stringify(params);
    };
    SearchSuggestions.prototype.setQuery = function (query, makeApiRequest) {
        this.requestOptions = __assign(__assign({}, this.requestOptions), { params: __assign(__assign({}, this.requestOptions.params), { query: query }) });
        makeApiRequest && this.call(this.requestOptions);
    };
    SearchSuggestions.prototype.new = function (requestOptions) {
        var _this = this;
        this.requestOptions = requestOptions;
        return {
            setQuery: function (query, makeApiRequest) {
                if (makeApiRequest === void 0) { makeApiRequest = true; }
                return _this.setQuery(query, makeApiRequest);
            }
        };
    };
    return SearchSuggestions;
}(apiConnector_1.default));
exports.default = new SearchSuggestions();
//# sourceMappingURL=index.js.map