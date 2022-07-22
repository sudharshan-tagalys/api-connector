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
var common_1 = require("../shared/helpers/common");
var plp_base_1 = require("../lib/plp-base");
var ProductListingPage = /** @class */ (function (_super) {
    __extends(ProductListingPage, _super);
    function ProductListingPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // == HELPERS ==
        _this.getDefaultRequestState = function () {
            return {
                product_listing_page_id: "",
                filters: {},
                request: [
                    'total',
                    'results',
                    'details',
                    'filters',
                    'sort_options',
                    'variables',
                    'banners'
                ],
                page: 1,
                perPage: 16,
                sort: ""
            };
        };
        _this.getDefaultResponseState = function () {
            return {
                name: "",
                total_pages: null,
                page: null,
                total: null,
                products: [],
                filters: [],
                sort_options: [],
                // TODO: do we need to consider banners and variables?
                banners: [],
                variants: [],
            };
        };
        return _this;
    }
    ProductListingPage.exporterName = function () {
        return 'ProductListingPage';
    };
    ProductListingPage.prototype.getRequestOptions = function () {
        console.log(this.requestOptions.params);
        return {
            path: "mpages/_platform/".concat(this.requestOptions.params.product_listing_page_id),
            params: this.requestOptions.params,
        };
    };
    ProductListingPage.prototype.extractAnalyticsData = function (response) {
        if (response === false) {
            return {};
        }
        var eventDetails = {
            pl_type: 'mpage-platform',
            pl_details: {
                url: this.requestOptions.params.product_listing_page_id,
                title: response.name
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
    ProductListingPage.prototype.formatResponse = function (response) {
        return this.responseFormatter.productListingPage(response);
    };
    ProductListingPage.prototype.setRequestParamsFromRequestState = function () {
        this.requestOptions.params = __assign(__assign({}, this.getParamsFromRequestState()), { product_listing_page_id: this.requestOptions.params.product_listing_page_id });
    };
    ProductListingPage.prototype.getRequestStateFromParams = function (params) {
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
    ProductListingPage.prototype.getRequestParams = function (state) {
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
    ProductListingPage.prototype.getEncodedQueryString = function (except) {
        if (except === void 0) { except = []; }
        return (0, common_1.getEncodedQueryString)({
            filters: this.requestState.filters,
            page: this.requestState.page,
            sort: this.requestState.sort,
            except: except
        });
    };
    ProductListingPage.prototype.commonHelpers = function () {
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
    return ProductListingPage;
}(plp_base_1.default));
exports.default = ProductListingPage;
//# sourceMappingURL=index.js.map