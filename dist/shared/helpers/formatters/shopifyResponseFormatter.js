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
    ShopifyResponseFormatter.prototype.fieldsToIgnore = function () {
        return ['sku'];
    };
    return ShopifyResponseFormatter;
}(formatter_1.default));
exports.default = ShopifyResponseFormatter;
//# sourceMappingURL=shopifyResponseFormatter.js.map