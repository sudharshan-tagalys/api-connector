"use strict";
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
var common_1 = require("./lib/common");
var graphql_queries_1 = require("./lib/graphql-queries");
var shopifyApi_1 = require("./lib/shopifyApi");
var grapqhl_to_common_response_formatter_1 = require("./lib/grapqhl-to-common-response-formatter");
var shopifyConfiguration_1 = require("../../lib/shopifyConfiguration");
var configuration_1 = require("../../lib/configuration");
var DEFAULT_SORT_OPTIONS = [
    {
        "id": "best-selling",
        "label": "Best selling",
    },
    {
        "id": "manual",
        "label": "Manual",
    },
    {
        "id": "created-desc",
        "label": "Newest",
    },
    {
        "id": "created-asc",
        "label": "Oldest",
    },
    {
        "id": "price-desc",
        "label": "Price descending",
    },
    {
        "id": "price-asc",
        "label": "Price ascending",
    },
    {
        "id": "title",
        "label": "Title",
    }
];
var ProductListingPage = /** @class */ (function () {
    function ProductListingPage(requestState, responseState) {
        this.requestState = requestState;
        this.responseState = responseState;
        this.queries = new graphql_queries_1.default();
        this.graphqlResponseFormatter = new grapqhl_to_common_response_formatter_1.default();
    }
    ProductListingPage.prototype.getSortVariables = function () {
        var sortOptionToSortKeyMap = {
            'manual': {
                sortKey: "MANUAL",
                reverse: false
            },
            'best-selling': {
                sortKey: "BEST_SELLING",
                reverse: false
            },
            'created-desc': {
                sortKey: 'CREATED',
                reverse: true
            },
            'created-asc': {
                sortKey: 'CREATED',
                reverse: false
            },
            'price-desc': {
                sortKey: 'PRICE',
                reverse: true,
            },
            'price-asc': {
                sortKey: 'PRICE',
                reverse: false
            },
            'title': {
                sortKey: 'TITLE',
                reverse: false
            },
            'id': {
                sortKey: 'ID',
                reverse: false
            },
            'collection-default': {
                sortKey: 'COLLECTION_DEFAULT',
                reverse: false
            }
        };
        return sortOptionToSortKeyMap[this.requestState.sort];
    };
    ProductListingPage.prototype.getPaginationVariables = function () {
        var paginationVariables = {};
        if (this.requestState.endCursor) {
            paginationVariables['after'] = this.requestState.endCursor;
            paginationVariables['first'] = this.requestState.perPage;
        }
        if (this.requestState.startCursor) {
            paginationVariables['before'] = this.requestState.startCursor;
            paginationVariables['last'] = this.requestState.perPage;
        }
        if (!this.requestState.startCursor && !this.requestState.endCursor) {
            paginationVariables['first'] = this.requestState.perPage;
        }
        return paginationVariables;
    };
    ProductListingPage.prototype.getFilterVariables = function () {
        var _this = this;
        var filterVariables = {};
        if (Object.keys(this.requestState.filters).length) {
            var filtersToApply_1 = [];
            for (var _i = 0, _a = Object.entries(this.requestState.filters); _i < _a.length; _i++) {
                var _b = _a[_i], _ = _b[0], filterValues = _b[1];
                var values = filterValues;
                if (filterValues.hasOwnProperty("selected_min")) {
                    filtersToApply_1.push({
                        price: {
                            min: parseFloat(filterValues['selected_min']),
                            max: parseFloat(filterValues['selected_max'])
                        }
                    });
                }
                else {
                    values.forEach(function (filterValue) {
                        if (_this.responseState.filter_inputs && _this.responseState.filter_inputs[filterValue]) {
                            var selectedFilterValue = _this.responseState.filter_inputs[filterValue];
                            filtersToApply_1.push(JSON.parse(selectedFilterValue.input));
                        }
                    });
                }
            }
            filterVariables['filters'] = filtersToApply_1;
        }
        return filterVariables;
    };
    ProductListingPage.prototype.getMetafieldVariables = function () {
        if (!shopifyConfiguration_1.default.hasMetafields()) {
            return {
                product_metafields: [],
            };
        }
        var metafieldsToQuery = shopifyConfiguration_1.default.getMetafields();
        return {
            product_metafields: (metafieldsToQuery.products || []),
        };
    };
    ProductListingPage.prototype.getQueryVariables = function () {
        return __assign(__assign(__assign(__assign({ id: "gid://shopify/Collection/".concat(this.requestState.product_listing_page_id) }, this.getSortVariables()), this.getPaginationVariables()), this.getFilterVariables()), this.getMetafieldVariables());
    };
    ProductListingPage.prototype.getQuery = function () {
        return "\n      query Collection(\n        $id: ID,\n        $first: Int,\n        $last: Int,\n        $before: String,\n        $after: String,\n        $sortKey: ProductCollectionSortKeys,\n        $reverse: Boolean,\n        $filters: [ProductFilter!],\n        $product_metafields: [HasMetafieldsIdentifier!]!,\n      ) @inContext(country: ".concat(configuration_1.default.getCountryCode(), ") {\n        collection(id: $id){\n          title\n          handle\n          products(first: $first, last: $last, after: $after, before: $before, sortKey: $sortKey, reverse: $reverse, filters: $filters) {\n            filters {\n              id\n              label\n              type\n              values {\n                id\n                label\n                count\n                input\n              }\n            }\n            edges{\n              node{\n                ").concat(this.queries.getProductDetails(), "\n              }\n            }\n            pageInfo{\n              hasNextPage\n              hasPreviousPage\n              endCursor\n              startCursor\n            }\n          }\n        }\n      }\n    ");
    };
    ProductListingPage.getFilterInputsQuery = function () {
        return "\n    query Collection(\n      $id: ID,\n    ) {\n      collection(id: $id){\n        products(first: 1) {\n          ".concat(graphql_queries_1.default.getFilters(), "\n        }\n      }\n    }\n    ");
    };
    ProductListingPage.prototype.getRequestOptions = function () {
        return {
            path: "graphql.json",
            apiVersion: common_1.API_VERSION
        };
    };
    ProductListingPage.prototype.getSortOptions = function (requestOptions) {
        var _this = this;
        var sortOptions = (requestOptions.params.sort_options || DEFAULT_SORT_OPTIONS);
        sortOptions.forEach(function (sortOption) {
            if (sortOption.id === _this.requestState.sort) {
                sortOption.selected = true;
            }
            else {
                sortOption.selected = false;
            }
        });
        if (this.requestState.sort === null && sortOptions.length > 0) {
            sortOptions[0].selected = true;
        }
        return sortOptions;
    };
    ProductListingPage.prototype.formatResponse = function (requestOptions, shopifyResponse) {
        return {
            name: shopifyResponse.collection.title,
            products: this.graphqlResponseFormatter.formatProducts(shopifyResponse.collection.products),
            filters: this.graphqlResponseFormatter.formatFilters(shopifyResponse.collection.products.filters, this.requestState.filters, this.responseState.price_ranges),
            sort_options: this.getSortOptions(requestOptions),
            page_info: shopifyResponse.collection.products.pageInfo,
            filter_inputs: grapqhl_to_common_response_formatter_1.default.getFilterInputs(shopifyResponse.collection.products.filters)
        };
    };
    ProductListingPage.prototype.apiClient = function () {
        return new shopifyApi_1.default();
    };
    ProductListingPage.prototype.getDataForInitialRequest = function (requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var filterInputsQuery, response, filterInputs, rangeFilter, price_ranges, filtersForRequestParams, _loop_1, _i, _a, _b, filterId, appliedFilterValues;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        filterInputsQuery = ProductListingPage.getFilterInputsQuery();
                        return [4 /*yield*/, this.apiClient().call("POST", "graphql.json", {
                                params: JSON.stringify({
                                    query: filterInputsQuery,
                                    variables: {
                                        id: "gid://shopify/Collection/".concat(requestOptions.params.product_listing_page_id)
                                    }
                                })
                            })];
                    case 1:
                        response = _c.sent();
                        filterInputs = grapqhl_to_common_response_formatter_1.default.getFilterInputs(response.collection.products.filters);
                        rangeFilter = response.collection.products.filters.find(function (filter) { return filter.type === "PRICE_RANGE"; });
                        price_ranges = {};
                        if (rangeFilter) {
                            price_ranges = JSON.parse(rangeFilter.values[0].input).price;
                        }
                        filtersForRequestParams = {};
                        _loop_1 = function (filterId, appliedFilterValues) {
                            // checkbox filter
                            var appliedFilter = response.collection.products.filters.find(function (filter) { return filter.id === filterId; });
                            if (Array.isArray(appliedFilterValues)) {
                                var formattedFilterValues_1 = [];
                                appliedFilterValues.forEach(function (filterLabel) {
                                    if (appliedFilter.type === "LIST" || appliedFilter.type === "BOOLEAN") {
                                        appliedFilter.values.forEach(function (filterValue) {
                                            if (filterLabel === filterValue.label) {
                                                formattedFilterValues_1.push(filterValue.id);
                                            }
                                        });
                                    }
                                });
                                filtersForRequestParams[filterId] = formattedFilterValues_1;
                            }
                            else {
                                filtersForRequestParams[filterId] = appliedFilterValues;
                            }
                        };
                        for (_i = 0, _a = Object.entries(this.requestState.filters); _i < _a.length; _i++) {
                            _b = _a[_i], filterId = _b[0], appliedFilterValues = _b[1];
                            _loop_1(filterId, appliedFilterValues);
                        }
                        return [2 /*return*/, {
                                filtersForRequestParams: filtersForRequestParams,
                                filter_inputs: filterInputs,
                                price_ranges: price_ranges
                            }];
                }
            });
        });
    };
    ProductListingPage.prototype.helpersToExpose = function () {
        var _this = this;
        return {
            getQuery: function () { return _this.getQuery(); },
            getQueryVariables: function () { return _this.getQueryVariables(); },
            formatResponse: function (requestOptions, shopifyResponse) { return _this.formatResponse(requestOptions, shopifyResponse); },
            getFilterInputs: function (filtersFromResponse) { return grapqhl_to_common_response_formatter_1.default.getFilterInputs(filtersFromResponse); },
            getDataForInitialRequest: function (requestOptions) { return _this.getDataForInitialRequest(requestOptions); },
        };
    };
    ProductListingPage.export = function () {
        var _this = this;
        return {
            ProductListingPage: {
                new: function (requestState, responseState) {
                    var instance = new _this(requestState, responseState);
                    return instance.helpersToExpose();
                }
            }
        };
    };
    return ProductListingPage;
}());
exports.default = ProductListingPage;
//# sourceMappingURL=product-listing-page.js.map