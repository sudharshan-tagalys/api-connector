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
        return {
            path: "mpages/_platform/".concat(this.requestOptions.params.product_listing_page_id),
            params: this.requestOptions.params,
        };
    };
    ProductListingPage.prototype.getHealthCheckDetails = function () {
        return ProductListingPage.getHealthCheckDetails();
    };
    ProductListingPage.getHealthCheckDetails = function () {
        return {
            path: "mpages/_health"
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
    ProductListingPage.prototype.getRequestParams = function (state) {
        var params = __assign({}, _super.prototype.getRequestParams.call(this, state));
        if (state.product_listing_page_id) {
            params['product_listing_page_id'] = state.product_listing_page_id;
        }
        if (state.sort_options) {
            params['sort_options'] = state.sort_options;
        }
        return params;
    };
    ProductListingPage.prototype.getRequestStateFromParams = function (params) {
        var state = __assign({}, _super.prototype.getRequestStateFromParams.call(this, params));
        if (params.product_listing_page_id) {
            state['product_listing_page_id'] = params.product_listing_page_id;
        }
        return state;
    };
    ProductListingPage.prototype.getHelpers = function (type) {
        var _this = this;
        return __assign(__assign({}, _super.prototype.getHelpers.call(this, type)), { hasNoProducts: function () {
                return _this.productHelpers.getTotalProductsCount() === 0;
            } });
    };
    return ProductListingPage;
}(plp_base_1.default));
exports.default = ProductListingPage;
//# sourceMappingURL=index.js.map