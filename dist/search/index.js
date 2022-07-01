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
var filter_1 = require("./helpers/filter");
var search_1 = require("./helpers/search");
var pagination_1 = require("./helpers/pagination");
var sortOption_1 = require("./helpers/sortOption");
var product_1 = require("./helpers/product");
var common_1 = require("../shared/helpers/common");
var DEFAULT_REQUEST_STATE = {
    query: "",
    queryMode: "",
    filters: {},
    queryFilters: {},
    request: ['details', 'filters', 'sort_options'],
    page: 1,
    perPage: 16,
    sort: "trending",
    cache: true,
};
var DEFAULT_RESPONSE_STATE = {
    query: "",
    total_pages: null,
    page: null,
    total: null,
    query_original: null,
    query_mode: null,
    products: [],
    filters: [],
    sort_options: []
};
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        var _this = _super.call(this) || this;
        // == STATE ==
        _this.requestState = DEFAULT_REQUEST_STATE;
        _this.responseState = DEFAULT_RESPONSE_STATE;
        _this.filterHelpers = _this.bindThisToHelpers(filter_1.default);
        _this.paginationHelpers = _this.bindThisToHelpers(pagination_1.default);
        _this.searchHelpers = _this.bindThisToHelpers(search_1.default);
        _this.sortOptionHelpers = _this.bindThisToHelpers(sortOption_1.default);
        _this.productHelpers = _this.bindThisToHelpers(product_1.default);
        return _this;
    }
    Search.exporterName = function () {
        return 'Search';
    };
    Search.prototype.bindThisToHelpers = function (helpers) {
        var _this = this;
        return Object.entries(helpers).reduce(function (acc, _a) {
            var _b;
            var actionName = _a[0], action = _a[1];
            return __assign(__assign({}, acc), (_b = {}, _b[actionName] = action.bind(_this), _b));
        }, {});
    };
    Search.prototype.setResponseState = function (responseState) {
        this.responseState = __assign(__assign({}, this.responseState), responseState);
    };
    Search.prototype.setRequestState = function (mutationCallback, callAPI) {
        if (callAPI === void 0) { callAPI = true; }
        var newRequestState = mutationCallback(this.requestState);
        this.requestState = newRequestState;
        if (this.requestOptions.onStateChange) {
            this.requestOptions.onStateChange(this.requestState);
        }
        this.setRequestParamsFromRequestState();
        callAPI && this.call(this.requestOptions);
    };
    Search.prototype.addToRecentSearch = function () {
        var requestParams = (0, common_1.getRequestParamsFromWindowLocation)();
        var recentSearches = localStorage.getItem("tagalysRecentSearches") || { queries: [] };
        recentSearches.queries = recentSearches.concat([{
                displayString: requestParams.query,
                queryString: (0, common_1.getEncodedQueryString)(requestParams)
            }]);
        localStorage.setValue("tagalysRecentSearches", recentSearches, 3600000);
    };
    Search.prototype.getRequestOptions = function () {
        return {
            path: 'search',
            params: this.requestOptions.params,
        };
    };
    Search.prototype.extractAnalyticsData = function (response) {
        var eventDetails = {
            pl_type: 'search',
            pl_details: {
                q: this.requestState.query,
                qm: this.requestState.queryMode,
                f: this.requestState.filters
            },
            pl_page: this.requestState.page,
        };
        if (response.details) {
            eventDetails['pl_products'] = response["details"].map(function (product) { return product.sku; });
            eventDetails['pl_total'] = response["details"].length;
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
        if (params.page) {
            requestState['page'] = params.page;
        }
        if (params.perPage) {
            requestState["perPage"] = params.perPage;
        }
        if (params.sort) {
            requestState['sort'] = params.sort;
        }
        if (params.cache) {
            requestState['cache'] = params.cache;
        }
        return __assign(__assign({}, DEFAULT_REQUEST_STATE), requestState);
    };
    Search.prototype.getParamsFromRequestState = function () {
        return this.getRequestParams(this.requestState);
    };
    Search.prototype.getRequestParams = function (state) {
        var query = state.query, queryMode = state.queryMode, queryFilters = state.queryFilters, filters = state.filters, cache = state.cache, request = state.request, page = state.page, perPage = state.perPage;
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
            params['f'] = this.getFilterParams(filters);
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
        if (cache) {
            params['cache'] = cache;
        }
        if (this.getSortString().length) {
            params['sort'] = this.getSortString();
        }
        return params;
    };
    Search.prototype.getFilterParams = function (filters) {
        var _this = this;
        var filterParamsForRequest = {};
        var _loop_1 = function (filterId, filterParams) {
            if (Array.isArray(filterParams)) {
                var parentIdsToRemove_1 = [];
                filterParams.forEach(function (appliedFilterItemId) {
                    var parentFilterItemIds = _this.filterHelpers.getParentFilterItemIds(appliedFilterItemId);
                    parentIdsToRemove_1 = parentIdsToRemove_1.concat(parentFilterItemIds);
                });
                filterParamsForRequest[filterId] = filterParams.filter(function (appliedFilterItemId) { return !parentIdsToRemove_1.includes(appliedFilterItemId); });
            }
            else {
                filterParamsForRequest[filterId] = filterParams;
            }
        };
        for (var _i = 0, _a = Object.entries(filters); _i < _a.length; _i++) {
            var _b = _a[_i], filterId = _b[0], filterParams = _b[1];
            _loop_1(filterId, filterParams);
        }
        return filterParamsForRequest;
    };
    Search.prototype.getSortString = function () {
        var sort = this.requestState.sort;
        if (sort) {
            return sort;
        }
        return '';
    };
    Search.prototype.isRequested = function (requestItem) {
        return this.requestState.request.includes(requestItem);
    };
    Search.prototype.getEncodedQueryString = function (except) {
        if (except === void 0) { except = []; }
        return (0, common_1.getEncodedQueryString)({
            query: this.requestState.query,
            queryFilter: this.requestState.queryFilters,
            filter: this.requestState.filters,
            page: this.requestState.page,
            sort: this.requestState.sort,
            except: except
        });
    };
    Search.prototype.commonHelpers = function () {
        var _this = this;
        return {
            getEncodedQueryString: function (except) {
                if (except === void 0) { except = []; }
                return _this.getEncodedQueryString.call(_this, except);
            },
            getRequestParamsFromQueryString: function (queryString) { return (0, common_1.getRequestParamsFromQueryString)(queryString); },
            getRequestParamsFromWindowLocation: function () { return (0, common_1.getRequestParamsFromWindowLocation)(); },
            getRequestState: function () { return _this.requestState; },
            getResponseState: function () { return _this.responseState; },
            addToRecentSearch: function () { return _this.addToRecentSearch(); }
        };
    };
    Search.prototype.internalSuccessCallback = function (_, formattedResponse) {
        this.setResponseState(formattedResponse);
    };
    Search.prototype.getHelpersToExpose = function (type) {
        var _this = this;
        if (type === void 0) { type = 'request'; }
        var functionToCall = (type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers');
        var helpers = __assign(__assign(__assign(__assign(__assign(__assign({}, this.searchHelpers[functionToCall]()), this.filterHelpers[functionToCall]()), this.sortOptionHelpers[functionToCall]()), this.productHelpers[functionToCall]()), this.paginationHelpers[functionToCall]()), this.commonHelpers());
        if (type === 'request') {
            helpers = __assign(__assign({}, helpers), { setParams: function (params) {
                    var requestState = _this.getRequestStateFromParams(params);
                    if (Object.keys(requestState).length) {
                        _this.requestState = requestState;
                    }
                    _this.setRequestParamsFromRequestState();
                } });
        }
        return helpers;
    };
    Search.prototype.setRequestParamsFromRequestState = function () {
        this.requestOptions.params = this.getParamsFromRequestState();
    };
    Search.prototype.beforeAPICall = function (_) {
        var updatedState = this.requestOptions.beforeAPICall(this.requestState);
        return this.getRequestParams(updatedState);
    };
    Search.prototype.new = function (requestOptions) {
        this.requestOptions = requestOptions;
        var requestState = this.getRequestStateFromParams(this.requestOptions.params);
        if (Object.keys(requestState).length) {
            this.requestState = requestState;
        }
        this.setRequestParamsFromRequestState();
        return this.getHelpersToExpose('request');
    };
    return Search;
}(apiConnector_1.default));
exports.default = Search;
//# sourceMappingURL=index.js.map