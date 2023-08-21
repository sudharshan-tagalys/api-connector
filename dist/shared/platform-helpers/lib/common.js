"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromGraphqlId = exports.METAFIELD_TYPES = exports.API_VERSION = exports.getPriceDetails = exports.getMax = exports.getMin = exports.getProductPriceAndCompareAtPrice = exports.getVariantCompareAtPrices = exports.getVariantPrices = exports.applyCurrencyConversion = exports.unique = void 0;
var configuration_1 = require("../../../lib/configuration");
var unique = function (value, index, self) {
    return self.indexOf(value) === index;
};
exports.unique = unique;
var applyCurrencyConversion = function (number) {
    if (number !== null) {
        var exchangeRate = configuration_1.default.getExchangeRate();
        var fractionalDigits = configuration_1.default.getFractionalDigits();
        var convertedNumber = number * exchangeRate;
        convertedNumber = Math.round(convertedNumber * Math.pow(10, fractionalDigits)) / Math.pow(10, fractionalDigits);
        return convertedNumber;
    }
    return null;
};
exports.applyCurrencyConversion = applyCurrencyConversion;
var getVariantPrices = function (variants) {
    return variants.filter(function (variant) { return variant.node.price !== null; }).map(function (variant) { return parseFloat(variant.node.price.amount); });
};
exports.getVariantPrices = getVariantPrices;
var getVariantCompareAtPrices = function (variants) {
    return variants.filter(function (variant) { return variant.node.compareAtPrice !== null; }).map(function (variant) { return parseFloat(variant.node.compareAtPrice.amount); });
};
exports.getVariantCompareAtPrices = getVariantCompareAtPrices;
var getProductPriceAndCompareAtPrice = function (variants) {
    var prices = variants.map(function (productVariant) {
        return parseFloat(productVariant.node.price.amount);
    });
    var variantCompareAtPrices = variants.map(function (productVariant) {
        var price = parseFloat(productVariant.node.price.amount);
        if (productVariant.node.compareAtPrice) {
            var compareAtPrice = parseFloat(productVariant.node.compareAtPrice.amount);
            if (compareAtPrice > price) {
                return compareAtPrice;
            }
        }
        return price;
    });
    var price = prices.length > 0 ? Math.min.apply(Math, prices) : null;
    var compareAtPrice = variantCompareAtPrices.length > 0 ? Math.min.apply(Math, variantCompareAtPrices) : null;
    if (compareAtPrice !== null && price !== null) {
        compareAtPrice = Math.max.apply(Math, [price, compareAtPrice]);
    }
    return {
        price: price !== null ? (0, exports.applyCurrencyConversion)(price) : null,
        compareAtPrice: compareAtPrice !== null ? (0, exports.applyCurrencyConversion)(compareAtPrice) : null
    };
};
exports.getProductPriceAndCompareAtPrice = getProductPriceAndCompareAtPrice;
var getMin = function (prices) {
    return prices.length > 0 ? Math.min.apply(Math, prices) : 0;
};
exports.getMin = getMin;
var getMax = function (prices) {
    return prices.length > 0 ? Math.max.apply(Math, prices) : 0;
};
exports.getMax = getMax;
var getPriceDetails = function (product) {
    var productVariants = product.variants.edges;
    var priceAndCompareAtPrice = (0, exports.getProductPriceAndCompareAtPrice)(productVariants);
    var variantCompareAtPrices = (0, exports.getVariantCompareAtPrices)(productVariants);
    var variantPrices = (0, exports.getVariantPrices)(productVariants);
    var variantPricesMap = {};
    productVariants.forEach(function (productVariant) {
        var variantId = productVariant.node.id.split("/").pop();
        var variantPrice = parseFloat(productVariant.node.price.amount);
        var variantCompareAtPrice = productVariant.node.compareAtPrice ? parseFloat(productVariant.node.compareAtPrice.amount) : null;
        variantPricesMap[variantId] = {
            price: (0, exports.applyCurrencyConversion)(variantPrice),
            compare_at_price: (0, exports.applyCurrencyConversion)(variantCompareAtPrice)
        };
    });
    return {
        price: priceAndCompareAtPrice.price,
        compare_at_price: priceAndCompareAtPrice.compareAtPrice,
        price_varies: variantPrices.filter(exports.unique).length > 1,
        compare_at_price_varies: variantCompareAtPrices.filter(exports.unique).length > 1,
        price_min: (0, exports.applyCurrencyConversion)((0, exports.getMin)(variantPrices)),
        price_max: (0, exports.applyCurrencyConversion)((0, exports.getMax)(variantPrices)),
        compare_at_price_min: (0, exports.applyCurrencyConversion)((0, exports.getMin)(variantCompareAtPrices)),
        compare_at_price_max: (0, exports.applyCurrencyConversion)((0, exports.getMax)(variantCompareAtPrices)),
        variantPricesMap: variantPricesMap
    };
};
exports.getPriceDetails = getPriceDetails;
exports.API_VERSION = '2023-04';
exports.METAFIELD_TYPES = {
    LIST_PRODUCT_REFERENCE: 'list.product_reference',
    COLLECTION_REFERENCE: 'collection_reference',
    SINGLE_LINE_TEXT_FIELD: "single_line_text_field",
    LIST_SINGLE_LINE_TEXT_FIELD: "list.single_line_text_field"
};
var getIdFromGraphqlId = function (graphqlId) {
    var id = graphqlId.split("/").slice(-1)[0];
    return parseInt(id);
};
exports.getIdFromGraphqlId = getIdFromGraphqlId;
//# sourceMappingURL=common.js.map