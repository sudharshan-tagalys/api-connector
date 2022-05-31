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
var formatter_1 = require("./formatter");
var ShopifyResponseFormatter = /** @class */ (function (_super) {
    __extends(ShopifyResponseFormatter, _super);
    function ShopifyResponseFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopifyResponseFormatter.prototype.platformFieldTranslations = function () {
        return {
            __id: function (data) {
                return {
                    key: 'id',
                    value: parseInt(data.__id)
                };
            },
            name: 'title',
            price: 'compare_at_price',
            sale_price: 'price',
            introduced_at: 'published_at',
            shopify_tags: function (data) {
                if (Array.isArray(data.shopify_tags)) {
                    return {
                        key: 'tags',
                        value: data.shopify_tags
                    };
                }
                return {
                    key: 'tags',
                    value: data.shopify_tags.split(", ").sort()
                };
            },
            _vendor: function (data) {
                if (Array.isArray(data._vendor)) {
                    return {
                        key: 'vendor',
                        value: data._vendor[0]
                    };
                }
                return {
                    key: 'vendor',
                    value: data._vendor
                };
            },
            images: 'images',
            variants: 'variants'
        };
    };
    ShopifyResponseFormatter.prototype.additionalPlatformFields = function (detail) {
        return {
            handle: detail.link.split("/products/")[1]
        };
    };
    ShopifyResponseFormatter.prototype.similarProducts = function (response) {
        return {
            products: this.formatDetails(response.details)
        };
    };
    ShopifyResponseFormatter.prototype.smartWidgets = function (response) {
        return {
            name: response.name,
            widget_name: response.widget_name,
            products: this.formatDetails(response.details)
        };
    };
    ShopifyResponseFormatter.prototype.searchSuggestions = function (response, configuration) {
        var getQueryString = function (q, qf) {
            if (qf === void 0) { qf = {}; }
            var _a = configuration.queryString, query = _a.query, queryFilter = _a.queryFilter;
            var baseQueryString = "?".concat(query, "=");
            var str = "";
            if (typeof (qf) == 'undefined' || Object.keys(qf).length === 0) {
                return (baseQueryString + encodeURIComponent(q));
            }
            else {
                str = Object.keys(qf).map(function (key) {
                    return encodeURIComponent(key) + "-" + encodeURIComponent(qf[key]);
                }).join('~');
                var qf_param = encodeURIComponent("".concat(queryFilter)) + '=' + str;
                return baseQueryString.concat(encodeURIComponent(q) + "&" + qf_param);
            }
        };
        var getFormattedQueries = function (response) {
            if (!response.queries)
                return [];
            return response.queries.map(function (queryObj) {
                var _a;
                var formattedQuery = {
                    displayString: "",
                    queryString: "",
                    rawQuery: queryObj
                };
                if (typeof queryObj.query === 'string') {
                    formattedQuery.displayString = queryObj.query;
                    formattedQuery.queryString = getQueryString(queryObj.query);
                    return formattedQuery;
                }
                if (Array.isArray(queryObj.query)) {
                    if (queryObj.hasOwnProperty('in')) {
                        var prefix = queryObj.query.join('');
                        var suffix = queryObj.in.hierarchy.map(function (item) { return item.name; }).join(" ".concat(configuration.hierachySeperator, " "));
                        var qf = __assign(__assign({}, queryObj.filter), (_a = {}, _a["".concat(queryObj.in.tag_set.id)] = queryObj.in.hierarchy.map(function (item) { return item.id; }), _a));
                        formattedQuery.displayString = "".concat(prefix, " ").concat(configuration.hierachySeperator, " ").concat(suffix);
                        formattedQuery.queryString = getQueryString(formattedQuery.displayString, qf);
                    }
                    else {
                        formattedQuery.displayString = queryObj.query.join(" ".concat(configuration.categorySeperator, " "));
                        formattedQuery.queryString = getQueryString(formattedQuery.displayString, queryObj.filter);
                    }
                }
                return formattedQuery;
            });
        };
        return {
            queries: getFormattedQueries(response),
            products: this.formatDetails(response.products)
        };
    };
    ShopifyResponseFormatter.prototype.fieldsToIgnore = function () {
        return ['sku'];
    };
    return ShopifyResponseFormatter;
}(formatter_1.default));
exports.default = ShopifyResponseFormatter;
//# sourceMappingURL=shopifyResponseFormatter.js.map