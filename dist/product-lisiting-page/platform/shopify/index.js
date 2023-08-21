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
var index_1 = require("../../index");
var pagination_1 = require("./helpers/pagination");
var common_1 = require("../../../shared/helpers/common");
var queryStringManager_1 = require("../../../lib/queryStringManager");
var constants_1 = require("../../../shared/constants");
var platform_helpers_1 = require("../../../shared/platform-helpers");
var ShopifyProductListingPage = /** @class */ (function (_super) {
    __extends(ShopifyProductListingPage, _super);
    function ShopifyProductListingPage() {
        var _this = _super.call(this) || this;
        _this.getDefaultRequestState = function () {
            return {
                product_listing_page_id: "",
                filters: {},
                perPage: 16,
                sort: null,
                startCursor: null,
                endCursor: null
            };
        };
        _this.getDefaultResponseState = function () {
            return {
                total: null,
                products: [],
                filters: [],
                sort_options: [],
                page_info: {},
                filterInputs: {},
                filterRanges: {}
            };
        };
        _this.paginationHelpers = _this.bindThisToHelpers(pagination_1.default);
        return _this;
    }
    ShopifyProductListingPage.prototype.platformHelper = function () {
        return platform_helpers_1.default.ProductListingPage.new(this.requestState, this.responseState);
    };
    ShopifyProductListingPage.prototype.apiClient = function () {
        return platform_helpers_1.default.apiClient();
    };
    ShopifyProductListingPage.prototype.resetPagination = function (requestState) {
        requestState.startCursor = null;
        requestState.endCursor = null;
    };
    ShopifyProductListingPage.prototype.handleInitialRequest = function (requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var dataForInitialRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.platformHelper().getDataForInitialRequest(requestOptions)];
                    case 1:
                        dataForInitialRequest = _a.sent();
                        this.setResponseState(__assign(__assign({}, this.responseState), { filter_inputs: dataForInitialRequest.filter_inputs, price_ranges: dataForInitialRequest.price_ranges }));
                        this.setRequestState(function (reqState) {
                            reqState.filters = dataForInitialRequest.filtersForRequestParams;
                            return reqState;
                        }, false, false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShopifyProductListingPage.prototype.call = function (initialRequestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var initialRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initialRequest = (Object.keys(this.responseState).length === 0);
                        if (!initialRequest) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.handleInitialRequest(initialRequestOptions)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.call.call(this, initialRequestOptions)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, _super.prototype.call.call(this)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShopifyProductListingPage.prototype.formatRequestParams = function (params, format) {
        return JSON.stringify({
            query: this.platformHelper().getQuery(),
            variables: this.platformHelper().getQueryVariables()
        });
    };
    ShopifyProductListingPage.prototype.getRequestOptions = function () {
        return {
            params: this.requestOptions.params,
            path: "graphql.json",
            format: constants_1.REQUEST_FORMAT.GRAPHQL,
        };
    };
    ShopifyProductListingPage.prototype.formatResponse = function (response) {
        return this.platformHelper().formatResponse(this.requestOptions, response);
    };
    ShopifyProductListingPage.prototype.getRequestStateFromParams = function (params) {
        var paramsToInclude = {};
        if (params.startCursor) {
            paramsToInclude['startCursor'] = params.startCursor;
        }
        if (params.endCursor) {
            paramsToInclude['endCursor'] = params.endCursor;
        }
        if (params.sort_options) {
            paramsToInclude['sort_options'] = params.sort_options;
        }
        return __assign(__assign({}, _super.prototype.getRequestStateFromParams.call(this, params)), paramsToInclude);
    };
    ShopifyProductListingPage.prototype.getRequestParams = function (state) {
        var params = __assign({}, _super.prototype.getRequestParams.call(this, state));
        if (state.sort_options) {
            params['sort_options'] = state.sort_options;
        }
        return params;
    };
    ShopifyProductListingPage.prototype.getEncodedQueryString = function (except) {
        var _this = this;
        if (except === void 0) { except = []; }
        var _a = queryStringManager_1.default.getConfiguration(), filterReplacement = _a.filterParameter, startCursorReplacement = _a.startCursorParameter, endCursorReplacement = _a.endCursorParameter, sortReplacement = _a.sortParameter;
        var filters = this.requestState.filters;
        var filtersForQueryParams = {};
        var _loop_1 = function (filterId, filterValues) {
            // checkbox filter
            if (Array.isArray(filterValues)) {
                var formattedFilterValues_1 = [];
                filterValues.forEach(function (filterValue) {
                    formattedFilterValues_1.push(_this.responseState.filter_inputs[filterValue].label);
                });
                filtersForQueryParams[filterId] = formattedFilterValues_1;
            }
            else {
                filtersForQueryParams[filterId] = filterValues;
            }
        };
        for (var _i = 0, _b = Object.entries(filters); _i < _b.length; _i++) {
            var _c = _b[_i], filterId = _c[0], filterValues = _c[1];
            _loop_1(filterId, filterValues);
        }
        var sort = this.requestState.sort;
        var params = {};
        var hasFilters = (Object.keys(filters).length !== 0);
        if (hasFilters) {
            params[filterReplacement] = (0, common_1.getFilterQueryString)(filtersForQueryParams);
        }
        if (this.requestState.startCursor) {
            params[startCursorReplacement] = this.requestState.startCursor;
        }
        if (this.requestState.endCursor) {
            params[endCursorReplacement] = this.requestState.endCursor;
        }
        if (sort && sort.length) {
            params[sortReplacement] = sort;
        }
        except.forEach(function (paramToDelete) {
            delete params[(0, common_1.getReplacementParam)(paramToDelete)];
        });
        return "".concat(queryStringManager_1.default.stringify(params));
    };
    ShopifyProductListingPage.prototype.getRequestParamsFromWindowLocation = function () {
        var queryString = window.location.search.replace("?", '');
        var parsedObjectFromQueryString = queryStringManager_1.default.parse(queryString.replace("?", ''));
        var _a = queryStringManager_1.default.getConfiguration(), filterParameter = _a.filterParameter, startCursorParameter = _a.startCursorParameter, endCursorParameter = _a.endCursorParameter, sortParameter = _a.sortParameter;
        var params = {};
        if (parsedObjectFromQueryString[filterParameter]) {
            params['filters'] = (0, common_1.getFiltersFromQueryString)(parsedObjectFromQueryString[filterParameter]);
        }
        if (parsedObjectFromQueryString[startCursorParameter]) {
            params['startCursor'] = parsedObjectFromQueryString[startCursorParameter];
        }
        if (parsedObjectFromQueryString[endCursorParameter]) {
            params['endCursor'] = parsedObjectFromQueryString[endCursorParameter];
        }
        if (parsedObjectFromQueryString[sortParameter]) {
            params['sort'] = parsedObjectFromQueryString[sortParameter];
        }
        return params;
    };
    ShopifyProductListingPage.prototype.mutateResponse = function (formattedResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, formattedResponse];
            });
        });
    };
    ShopifyProductListingPage.exporterName = function () {
        return 'ShopifyProductListingPage';
    };
    return ShopifyProductListingPage;
}(index_1.default));
exports.default = ShopifyProductListingPage;
//# sourceMappingURL=index.js.map