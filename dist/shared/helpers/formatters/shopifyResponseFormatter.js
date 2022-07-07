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
// has_only_default_variant
// compare_at_price_varies
// price_varies
// price_min
// compare_at_price_min
// options
// -- options_with_values
var hasOnlyDefaultVariant = function (detail) {
    if (detail.options.length > 1) {
        return false;
    }
    if (detail.variants.length > 1) {
        return false;
    }
    if (detail.options[0] === 'Title' && detail.variants[0].option1 === 'Default Title' && detail.variants[0].option2 === null && detail.variants[0].option3 === null) {
        return true;
    }
    return false;
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
        var variantCompareAtPrices = detail.variants.map(function (variant) { return variant.compare_at_price; });
        var variantPrices = detail.variants.map(function (variant) { return variant.price; });
        return {
            handle: detail.link.split("/products/")[1],
            compare_at_price_min: detail.price,
            price_min: detail.sale_price,
            options: detail.options,
            compare_at_price_varies: variantCompareAtPrices.filter(unique).length > 1,
            price_varies: variantPrices.filter(unique).length > 1,
            // has_only_default_variant: hasOnlyDefaultVariant(detail)
        };
    };
    ShopifyResponseFormatter.prototype.fieldsToIgnore = function () {
        return ['sku'];
    };
    return ShopifyResponseFormatter;
}(formatter_1.default));
exports.default = ShopifyResponseFormatter;
//# sourceMappingURL=shopifyResponseFormatter.js.map