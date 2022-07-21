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
var search_1 = require("./helpers/search");
var common_1 = require("../shared/helpers/common");
var plp_base_1 = require("../lib/plp-base");
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        var _this = _super.call(this) || this;
        _this.getDefaultRequestState = function () {
            return {
                query: "",
                queryMode: "",
                filters: {},
                queryFilters: {},
                request: ['details', 'filters', 'sort_options'],
                page: 1,
                perPage: 16,
                sort: ""
            };
        };
        _this.getDefaultResponseState = function () {
            return {
                query: "",
                total_pages: null,
                page: null,
                total: null,
                query_mode: null,
                products: [],
                filters: [],
                sort_options: []
            };
        };
        _this.searchHelpers = _this.bindThisToHelpers(search_1.default);
        return _this;
    }
    Search.exporterName = function () {
        return 'SearchResults';
    };
    Search.prototype.getRequestOptions = function () {
        return {
            path: 'search',
            params: this.requestOptions.params,
        };
    };
    Search.prototype.extractAnalyticsData = function (response) {
        if (response === false) {
            return {};
        }
        if (response.hasOwnProperty('error')) {
            return false;
        }
        if (response.hasOwnProperty('redirect_to_url')) {
            return false;
        }
        var eventDetails = {
            pl_type: 'search',
            pl_details: {
                q: response.query,
                qm: response.query_mode,
            },
            pl_products: [],
            pl_page: response.page,
            pl_total: response.total
        };
        if (Object.keys(this.requestState.filters).length) {
            eventDetails['pl_details']['f'] = this.requestState.filters;
        }
        if (response.details) {
            eventDetails['pl_products'] = response["details"].map(function (product) { return product.sku; });
        }
        if (this.getSortString().length) {
            eventDetails['pl_sort'] = this.getSortString();
        }
        return {
            event_type: "product_list",
            event_details: eventDetails
        };
    };
    Search.prototype.formatResponse = function (response) {
        return this.responseFormatter.search(response);
    };
    Search.prototype.getRequestStateFromParams = function (params) {
        var requestState = {};
        if (params.query) {
            requestState['query'] = params.query;
        }
        if (params.queryMode) {
            requestState['queryMode'] = params.queryMode;
        }
        if (params.request) {
            requestState['request'] = params.request;
        }
        if (params.filters) {
            requestState['filters'] = params.filters;
        }
        if (params.queryFilters) {
            requestState['queryFilters'] = params.queryFilters;
        }
        if (params.page) {
            requestState['page'] = params.page;
        }
        if (params.perPage) {
            requestState["perPage"] = params.perPage;
        }
        if (params.sort) {
            requestState['sort'] = params.sort;
        }
        return __assign(__assign({}, this.getDefaultRequestState()), requestState);
    };
    Search.prototype.getRequestParams = function (state) {
        var query = state.query, queryMode = state.queryMode, queryFilters = state.queryFilters, filters = state.filters, request = state.request, page = state.page, perPage = state.perPage;
        var params = {};
        if (query) {
            params['q'] = query;
        }
        if (queryMode) {
            params['qm'] = queryMode;
        }
        if (queryFilters) {
            params['qf'] = queryFilters;
        }
        if (filters) {
            params['f'] = filters;
        }
        if (request) {
            params['request'] = request;
        }
        if (page) {
            params['page'] = page;
        }
        if (perPage) {
            params['per_page'] = perPage;
        }
        if (this.getSortString().length) {
            params['sort'] = this.getSortString();
        }
        return params;
    };
    Search.prototype.getEncodedQueryString = function (except) {
        if (except === void 0) { except = []; }
        return (0, common_1.getEncodedQueryString)({
            query: this.requestState.query,
            queryFilters: this.requestState.queryFilters,
            filters: this.requestState.filters,
            page: this.requestState.page,
            sort: this.requestState.sort,
            except: except
        });
    };
    Search.prototype.commonHelpers = function () {
        var _this = this;
        return {
            getEncodedQueryString: function (requestParameters) { return (0, common_1.getEncodedQueryString)(requestParameters); },
            getEncodedQueryStringFromRequestState: function (except) {
                if (except === void 0) { except = []; }
                return _this.getEncodedQueryString.call(_this, except);
            },
            getRequestParamsFromQueryString: function (queryString) { return (0, common_1.getRequestParamsFromQueryString)(queryString); },
            getRequestParamsFromWindowLocation: function () { return (0, common_1.getRequestParamsFromWindowLocation)(); },
            getRequestState: function () { return _this.requestState; },
            getRequestParams: function () { return _this.requestState; },
            getResponseState: function () { return _this.responseState; },
            recordRecentSearch: function (queryString) { return (0, common_1.recordRecentSearch)(queryString); }
        };
    };
    Search.prototype.getHelpers = function (type) {
        var functionToCall = (type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers');
        var baseHelpers = _super.prototype.getHelpers.call(this, type);
        return __assign(__assign({}, baseHelpers), this.searchHelpers[functionToCall]());
    };
    return Search;
}(plp_base_1.default));
exports.default = Search;
//# sourceMappingURL=index.js.map