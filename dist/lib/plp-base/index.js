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
var apiConnector_1 = require("../apiConnector");
var filter_1 = require("./helpers/filter");
var pagination_1 = require("./helpers/pagination");
var sortOption_1 = require("./helpers/sortOption");
var product_1 = require("./helpers/product");
var common_1 = require("../../shared/helpers/common");
var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    function Base() {
        var _this = _super.call(this) || this;
        // == STATE ==
        _this.requestState = _this.getDefaultRequestState();
        _this.responseState = _this.getDefaultResponseState();
        _this.filterHelpers = _this.bindThisToHelpers(filter_1.default);
        _this.paginationHelpers = _this.bindThisToHelpers(pagination_1.default);
        _this.sortOptionHelpers = _this.bindThisToHelpers(sortOption_1.default);
        _this.productHelpers = _this.bindThisToHelpers(product_1.default);
        return _this;
    }
    Base.prototype.getDefaultRequestState = function () {
        return {};
    };
    Base.prototype.getDefaultResponseState = function () {
        return {};
    };
    Base.prototype.bindThisToHelpers = function (helpers) {
        var _this = this;
        return Object.entries(helpers).reduce(function (acc, _a) {
            var _b;
            var actionName = _a[0], action = _a[1];
            return __assign(__assign({}, acc), (_b = {}, _b[actionName] = action.bind(_this), _b));
        }, {});
    };
    Base.prototype.setResponseState = function (responseState) {
        this.responseState = __assign(__assign({}, this.responseState), responseState);
    };
    Base.prototype.setRequestState = function (mutationCallback, callAPI) {
        if (callAPI === void 0) { callAPI = true; }
        var newRequestState = mutationCallback(this.requestState);
        this.requestState = newRequestState;
        if (this.requestOptions.onStateChange) {
            this.requestOptions.onStateChange(this.requestState);
        }
        this.setRequestParamsFromRequestState();
        callAPI && this.call(this.requestOptions);
        this.requestState.action = "";
    };
    Base.prototype.getParamsFromRequestState = function () {
        return this.getRequestParams(this.requestState);
    };
    Base.prototype.getSortString = function () {
        var sort = this.requestState.sort;
        if (sort) {
            return sort;
        }
        return '';
    };
    Base.prototype.internalSuccessCallback = function (_, formattedResponse) {
        this.setResponseState(formattedResponse);
    };
    Base.prototype.getHelpers = function (type) {
        var _this = this;
        var functionToCall = (type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers');
        var helpers = __assign(__assign(__assign(__assign(__assign({}, this.filterHelpers[functionToCall]()), this.sortOptionHelpers[functionToCall]()), this.productHelpers[functionToCall]()), this.paginationHelpers[functionToCall]()), this.commonHelpers());
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
    Base.prototype.getHelpersToExpose = function (response, formattedResponse) {
        var _this = this;
        return __assign(__assign(__assign(__assign({}, _super.prototype.getHelpersToExpose.call(this, response, formattedResponse)), this.getHelpers('request')), this.getHelpers('response')), { getAnalyticsData: function () { return _this.extractAnalyticsData(response); } });
    };
    Base.prototype.setRequestParamsFromRequestState = function () {
        this.requestOptions.params = this.getParamsFromRequestState();
    };
    Base.prototype.beforeAPICall = function (_) {
        var updatedState = this.requestOptions.beforeAPICall(this.requestState);
        return this.getRequestParams(updatedState);
    };
    Base.prototype.new = function (requestOptions) {
        this.requestOptions = requestOptions;
        var requestState = this.getDefaultRequestState();
        if (this.requestOptions.hasOwnProperty('params')) {
            requestState = this.getRequestStateFromParams(this.requestOptions.params);
        }
        else {
            var params = (0, common_1.getRequestParamsFromWindowLocation)();
            requestState = this.getRequestStateFromParams(params);
        }
        if (Object.keys(requestState).length) {
            this.requestState = requestState;
        }
        else {
            console.error("Something went wrong in the request state");
        }
        // this.setRequestParamsFromRequestState()
        return this.getHelpersToExpose(false, false);
    };
    Base.prototype.getEncodedQueryString = function (except) {
        if (except === void 0) { except = []; }
        return (0, common_1.getEncodedQueryString)({
            filters: this.requestState.filters,
            page: this.requestState.page,
            sort: this.requestState.sort,
            except: except
        });
    };
    Base.prototype.getRequestStateFromParams = function (params) {
        var requestState = {};
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
    Base.prototype.getRequestParams = function (state) {
        var filters = state.filters, request = state.request, page = state.page, perPage = state.perPage;
        var params = {};
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
    Base.prototype.commonHelpers = function () {
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
        };
    };
    return Base;
}(apiConnector_1.default));
exports.default = Base;
//# sourceMappingURL=index.js.map