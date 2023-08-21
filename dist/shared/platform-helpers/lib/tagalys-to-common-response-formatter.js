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
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var shopifyConfiguration_1 = require("../../../lib/shopifyConfiguration");
var unique = function (value, index, self) {
    return self.indexOf(value) === index;
};
var TagalysToCommonResponseFormatter = /** @class */ (function () {
    function TagalysToCommonResponseFormatter() {
        var _this = this;
        this.formatDetail = function (detail) {
            var formattedDetail = {};
            for (var key in detail) {
                switch (key) {
                    case "__id":
                        formattedDetail.id = parseInt(detail.__id);
                        break;
                    case "name":
                        formattedDetail.title = detail.name;
                        break;
                    case "available":
                        formattedDetail.available = detail.available;
                        break;
                    case "shopify_tags":
                        formattedDetail.tags = _this.formatTags(detail.shopify_tags);
                        break;
                    case "variants":
                        formattedDetail = __assign(__assign(__assign(__assign({}, formattedDetail), { variants: _this.formatVariants(detail.variants) }), _this.getOptionRelatedFields(detail)), _this.getPriceRelatedFields(detail));
                        break;
                    case "_vendor":
                        formattedDetail.vendor = detail._vendor;
                        break;
                    case "images":
                        formattedDetail.images = _this.formatImages(detail.images);
                        break;
                    case "metafields":
                        formattedDetail.metafields = _this.formatMetafields(detail);
                        break;
                    case "link":
                        formattedDetail.handle = detail.link.split("/products/")[1];
                        break;
                    case "introduced_at":
                        formattedDetail.published_at = detail.introduced_at;
                        break;
                    case "media":
                        var formattedImages = _this.formatImages(detail.images);
                        formattedDetail.featured_image = _this.getFeaturedImage(formattedImages);
                        formattedDetail.media = detail.media;
                    case "in_stock":
                        formattedDetail.in_stock = detail.in_stock;
                        break;
                    case "_product_type":
                        formattedDetail.product_type = detail._product_type;
                        break;
                    default:
                        // TODO:// CONSIDER TAGALYS CUSTOM FIELDS AND TAG SETS HERE
                        break;
                }
            }
            return formattedDetail;
        };
    }
    TagalysToCommonResponseFormatter.prototype.formatImages = function (images) {
        return images.map(function (image) {
            return {
                position: image.position,
                alt: image.alt,
                width: image.width,
                height: image.height,
                src: image.src,
            };
        });
    };
    TagalysToCommonResponseFormatter.prototype.getFeaturedImage = function (images) {
        if (images.length > 0) {
            var featuredImage = images.find(function (image) { return image.position === 1; });
            return (featuredImage || null);
        }
        return null;
    };
    TagalysToCommonResponseFormatter.prototype.formatTags = function (tags) {
        if (Array.isArray(tags)) {
            return tags;
        }
        return tags.split(", ").sort();
    };
    TagalysToCommonResponseFormatter.prototype.formatVendor = function (_vendor) {
        if (Array.isArray(_vendor)) {
            return _vendor[0];
        }
        return _vendor;
    };
    TagalysToCommonResponseFormatter.prototype.formatMetafields = function (detail) {
        var _this = this;
        for (var namespace in detail.metafields) {
            for (var key in detail.metafields[namespace]) {
                if (shopifyConfiguration_1.default.isMetafieldConfigured(namespace, key, "products")) {
                    if (detail.hasOwnProperty("_references")) {
                        if (detail._references.metafields.hasOwnProperty(namespace) && detail._references.metafields[namespace].hasOwnProperty(key)) {
                            var metafieldReference = detail._references.metafields[namespace][key];
                            if (detail.metafields[namespace][key]['type'] === common_1.METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
                                detail.metafields[namespace][key]['value'] = metafieldReference.value.map(function (product_detail) {
                                    return _this.formatDetail(product_detail);
                                });
                            }
                            if (detail.metafields[namespace][key]['type'] === common_1.METAFIELD_TYPES.COLLECTION_REFERENCE) {
                                detail.metafields[namespace][key]['value'] = {
                                    id: parseInt(metafieldReference.value.id),
                                    title: metafieldReference.value.name,
                                    products: metafieldReference.value.product_details.map(function (product_detail) {
                                        return _this.formatDetail(product_detail);
                                    })
                                };
                            }
                        }
                    }
                    else {
                        // SECOND LEVEL
                        if (detail.metafields[namespace][key]['type'] === common_1.METAFIELD_TYPES.COLLECTION_REFERENCE) {
                            delete detail.metafields[namespace][key]['value'];
                            detail.metafields[namespace][key]['id'] = parseInt(detail.metafields[namespace][key]['value'][0]);
                        }
                        if (detail.metafields[namespace][key]['type'] === common_1.METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
                            delete detail.metafields[namespace][key]['value'];
                            detail.metafields[namespace][key]['ids'] = detail.metafields[namespace][key]['value'].map(function (value) { return parseInt(value); });
                        }
                    }
                    if (detail.metafields[namespace][key]['type'] === common_1.METAFIELD_TYPES.SINGLE_LINE_TEXT_FIELD) {
                        detail.metafields[namespace][key]['value'] = detail.metafields[namespace][key]['value'][0];
                    }
                }
                else {
                    delete detail.metafields[namespace][key];
                    if (Object.keys(detail.metafields[namespace]).length === 0) {
                        delete detail.metafields[namespace];
                    }
                }
            }
        }
        return detail.metafields;
    };
    TagalysToCommonResponseFormatter.prototype.getPriceRelatedFields = function (detail) {
        var variantCompareAtPrices = detail.variants.filter(function (variant) { return variant.compare_at_price !== null; }).map(function (variant) { return variant.compare_at_price; });
        var variantPrices = detail.variants.filter(function (variant) { return variant.price !== null; }).map(function (variant) { return variant.price; });
        var price = detail.sale_price;
        var compareAtPrice = variantCompareAtPrices.length > 0 ? Math.min.apply(Math, variantCompareAtPrices) : null;
        var priceMin = Math.min.apply(Math, variantPrices);
        var priceMax = Math.max.apply(Math, variantPrices);
        var compareAtPriceMin = Math.min.apply(Math, variantCompareAtPrices);
        var compareAtPriceMax = Math.max.apply(Math, variantCompareAtPrices);
        var priceVaries = variantPrices.filter(unique).length > 1;
        var compareAtPriceVaries = variantCompareAtPrices.filter(unique).length > 1;
        return {
            price_varies: priceVaries,
            compare_at_price_varies: compareAtPriceVaries,
            price: price ? (0, common_1.applyCurrencyConversion)(price) : null,
            compare_at_price: compareAtPrice ? (0, common_1.applyCurrencyConversion)(compareAtPrice) : null,
            price_min: (0, common_1.applyCurrencyConversion)(priceMin),
            price_max: (0, common_1.applyCurrencyConversion)(priceMax),
            compare_at_price_min: (0, common_1.applyCurrencyConversion)(compareAtPriceMin),
            compare_at_price_max: (0, common_1.applyCurrencyConversion)(compareAtPriceMax)
        };
    };
    TagalysToCommonResponseFormatter.prototype.getOptionRelatedFields = function (detail) {
        var optionRelatedFields = {};
        if (detail.hasOwnProperty('variants') && detail.hasOwnProperty('options')) {
            var options = detail.options.map(function (option) { return option.name; });
            optionRelatedFields['options'] = options;
            optionRelatedFields['options_with_values'] = detail.options.map(function (option) {
                return {
                    name: option.name,
                    position: option.position,
                    values: option.values
                };
            });
            optionRelatedFields['has_only_default_variant'] = this.hasOnlyDefaultVariant(options, detail.variants);
        }
        return optionRelatedFields;
    };
    TagalysToCommonResponseFormatter.prototype.formatVariants = function (variants) {
        if (variants && variants.length) { // confirm
            return variants.map(function (variant) {
                if (variant.price) {
                    variant.price = (0, common_1.applyCurrencyConversion)(variant.price);
                }
                if (variant.compare_at_price) {
                    variant.compare_at_price = (0, common_1.applyCurrencyConversion)(variant.compare_at_price);
                }
                return variant;
            });
        }
        return [];
    };
    TagalysToCommonResponseFormatter.prototype.hasOnlyDefaultVariant = function (options, variants) {
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
    TagalysToCommonResponseFormatter.prototype.helpersToExpose = function () {
        var _this = this;
        return {
            formatDetail: function (detail) { return _this.formatDetail(detail); }
        };
    };
    TagalysToCommonResponseFormatter.export = function () {
        var _this = this;
        return {
            TagalysToCommonResponseFormatter: {
                new: function () {
                    var instance = new _this();
                    return instance.helpersToExpose();
                }
            }
        };
    };
    return TagalysToCommonResponseFormatter;
}());
exports.default = TagalysToCommonResponseFormatter;
//# sourceMappingURL=tagalys-to-common-response-formatter.js.map