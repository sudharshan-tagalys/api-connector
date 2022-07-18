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
var unique = function (value, index, self) {
    return self.indexOf(value) === index;
};
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
            images: function (data) {
                // slice before sorting is a non destructive way (sort is a destructive array utility)
                var sortedImages = data.images.slice().sort(function (img1, img2) { return img1.position - img2.position; });
                return {
                    key: "images",
                    value: sortedImages
                };
            },
            variants: 'variants',
            available: 'available',
            metafields: 'metafields'
        };
    };
    ShopifyResponseFormatter.prototype.additionalPlatformFields = function (detail) {
        var additionalPlatformFields = {
            handle: detail.link.split("/products/")[1]
        };
        if (detail.hasOwnProperty('variants')) {
            var variantCompareAtPrices = detail.variants.filter(function (variant) { return variant.compare_at_price !== null; }).map(function (variant) { return variant.compare_at_price; });
            var variantPrices = detail.variants.filter(function (variant) { return variant.price !== null; }).map(function (variant) { return variant.price; });
            additionalPlatformFields['price_varies'] = variantPrices.filter(unique).length > 1;
            additionalPlatformFields['compare_at_price_varies'] = variantCompareAtPrices.filter(unique).length > 1;
            additionalPlatformFields['options_with_values'] = detail.options;
            additionalPlatformFields['price'] = detail.sale_price;
            additionalPlatformFields['compare_at_price'] = variantCompareAtPrices.length > 0 ? Math.min.apply(Math, variantCompareAtPrices) : null;
            additionalPlatformFields['price_min'] = variantPrices.length > 0 ? Math.min.apply(Math, variantPrices) : 0;
            additionalPlatformFields['price_max'] = variantPrices.length > 0 ? Math.max.apply(Math, variantPrices) : 0;
            additionalPlatformFields['compare_at_price_min'] = variantCompareAtPrices.length > 0 ? Math.min.apply(Math, variantCompareAtPrices) : 0;
            additionalPlatformFields['compare_at_price_max'] = variantCompareAtPrices.length > 0 ? Math.max.apply(Math, variantCompareAtPrices) : 0;
            if (detail.hasOwnProperty('options')) {
                var options = detail.options.map(function (option) { return option.name; });
                additionalPlatformFields['options'] = options;
                additionalPlatformFields['options_with_values'] = detail.options.map(function (option) {
                    return {
                        name: option.name,
                        position: option.position,
                        values: option.values
                    };
                });
                additionalPlatformFields['has_only_default_variant'] = this.hasOnlyDefaultVariant(options, detail.variants);
            }
        }
        return additionalPlatformFields;
    };
    ShopifyResponseFormatter.prototype.hasOnlyDefaultVariant = function (options, variants) {
        if (options.length > 1) {
            return false;
        }
        if (variants.length > 1) {
            return false;
        }
        if (options[0] === 'Title' && variants[0].option1 === 'Default Title' && variants[0].option2 === null && variants[0].option3 === null) {
            return true;
        }
        return false;
    };
    ShopifyResponseFormatter.prototype.fieldsToIgnore = function () {
        return ['sku', 'options', 'compare_at_price', 'price'];
    };
    return ShopifyResponseFormatter;
}(formatter_1.default));
exports.default = ShopifyResponseFormatter;
//# sourceMappingURL=shopifyResponseFormatter.js.map