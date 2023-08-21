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
var FILTER_TYPES = {
    LIST: "LIST",
    PRICE_RANGE: "PRICE_RANGE",
    BOOLEAN: "BOOLEAN"
};
var MEDIA_CONTENT_TYPES = {
    VIDEO: "VIDEO",
    EXTERNAL_VIDEO: "EXTERNAL_VIDEO",
    IMAGE: "IMAGE",
    MODEL_3D: "MODEL_3D"
};
var GraphqlResponseFormatter = /** @class */ (function () {
    function GraphqlResponseFormatter() {
    }
    GraphqlResponseFormatter.prototype.hasOnlyDefaultVariant = function (options, variants) {
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
    GraphqlResponseFormatter.prototype.formatProducts = function (products) {
        var _this = this;
        return products.edges.map(function (product_edge) {
            return _this.formatProduct(product_edge.node);
        });
    };
    GraphqlResponseFormatter.prototype.formatProduct = function (product, level) {
        if (level === void 0) { level = 1; }
        //TODO:// consider currency and display formatting for price related fields
        var variants = this.formatVariants(product.variants);
        var media = this.formatMedia(product.media);
        var images = this.formatImages(product.images);
        var priceDetails = (0, common_1.getPriceDetails)(product);
        return {
            id: (0, common_1.getIdFromGraphqlId)(product.id),
            title: product.title,
            published_at: product.publishedAt,
            available: product.availableForSale,
            tags: product.tags,
            variants: variants,
            featured_image: this.getFeaturedImage(images),
            images: images,
            media: media,
            vendor: product.vendor,
            product_type: product.productType,
            metafields: this.formatMetafields(product.metafields, level),
            handle: product.handle,
            options_with_values: GraphqlResponseFormatter.formatOptions(product.options),
            price: priceDetails.price,
            compare_at_price: priceDetails.compare_at_price,
            price_varies: priceDetails.price_varies,
            compare_at_price_varies: priceDetails.compare_at_price_varies,
            price_min: priceDetails.price_min,
            price_max: priceDetails.price_max,
            compare_at_price_min: priceDetails.compare_at_price_min,
            compare_at_price_max: priceDetails.compare_at_price_max,
            options: product.options.map(function (option) { return option.name; }),
            has_only_default_variant: this.hasOnlyDefaultVariant(product.options, variants),
            in_stock: (product.totalInventory > 0),
        };
    };
    GraphqlResponseFormatter.formatOptions = function (options) {
        return options.map(function (option, index) {
            return {
                name: option.name,
                position: index + 1,
                values: option.values
            };
        });
    };
    GraphqlResponseFormatter.prototype.formatImages = function (images) {
        return images.edges.map(function (image_edge, index) {
            var image = image_edge.node;
            return {
                position: index + 1,
                alt: image.altText,
                width: image.width,
                height: image.height,
                src: image.url
            };
        });
    };
    GraphqlResponseFormatter.prototype.formatMedia = function (media) {
        var _this = this;
        var formattedMedia = [];
        media.edges.forEach(function (mediaItem, index) {
            var position = index + 1;
            if (mediaItem.node.mediaContentType === MEDIA_CONTENT_TYPES.IMAGE) {
                formattedMedia.push({
                    position: position,
                    media_type: "image",
                    alt: mediaItem.node.image.altText,
                    width: mediaItem.node.image.width,
                    height: mediaItem.node.image.height,
                    src: mediaItem.node.image.url,
                    preview_image: _this.formatImage(mediaItem.node.previewImage)
                });
            }
            if (mediaItem.node.mediaContentType === MEDIA_CONTENT_TYPES.VIDEO) {
                formattedMedia.push({
                    position: position,
                    media_type: "video",
                    alt: mediaItem.node.alt,
                    duration: mediaItem.node.duration,
                    sources: _this.formatVideoSources(mediaItem.node.sources),
                    preview_image: _this.formatImage(mediaItem.node.preview.image)
                });
            }
        });
        return formattedMedia;
    };
    GraphqlResponseFormatter.prototype.formatImage = function (image) {
        return {
            alt: image.altText,
            width: image.width,
            height: image.height,
            src: image.url
        };
    };
    GraphqlResponseFormatter.prototype.formatVideoSources = function (videoSources) {
        return videoSources.map(this.formatVideoSource);
    };
    GraphqlResponseFormatter.prototype.formatVideoSource = function (videoSource) {
        return {
            file_size: videoSource.fileSize,
            format: videoSource.format,
            mime_type: videoSource.mime_type,
            height: videoSource.height,
            width: videoSource.width,
            url: videoSource.url
        };
    };
    GraphqlResponseFormatter.prototype.getFeaturedImage = function (images) {
        if (images.length > 0) {
            return images.find(function (image) { return image.position === 1; });
        }
        return null;
    };
    GraphqlResponseFormatter.prototype.formatVariants = function (variants) {
        var _this = this;
        return variants.edges.map(function (variantEdge, index) {
            return __assign({ id: (0, common_1.getIdFromGraphqlId)(variantEdge.node.id), title: variantEdge.node.title, sku: variantEdge.node.sku, price: variantEdge.node.price ? (0, common_1.applyCurrencyConversion)(variantEdge.node.price.amount) : null, compare_at_price: variantEdge.node.compareAtPrice ? (0, common_1.applyCurrencyConversion)(variantEdge.node.compareAtPrice.amount) : null, available: variantEdge.node.availableForSale, position: index + 1, metafields: {} }, _this.formatSelectedVariantOptions(variantEdge.node));
        });
    };
    GraphqlResponseFormatter.prototype.formatSelectedVariantOptions = function (variant) {
        var MAX_NUM_OF_OPTIONS = 3;
        var selectedVariantOptions = {};
        for (var index = 0; index < MAX_NUM_OF_OPTIONS; index++) {
            selectedVariantOptions["option".concat(index + 1)] = variant.selectedOptions[index] ? variant.selectedOptions[index].value : null;
        }
        return selectedVariantOptions;
    };
    GraphqlResponseFormatter.prototype.formatMetafields = function (metafields, level) {
        var _this = this;
        var formattedMetafields = {};
        metafields.forEach(function (metafield) {
            var _a;
            if (metafield) {
                formattedMetafields[_a = metafield.namespace] || (formattedMetafields[_a] = {});
                formattedMetafields[metafield.namespace][metafield.key] = _this.formatMetafield(metafield, level);
            }
        });
        return formattedMetafields;
    };
    GraphqlResponseFormatter.prototype.formatMetafield = function (metafield, level) {
        var _this = this;
        var type = metafield.type;
        var value = metafield.value;
        if (type === common_1.METAFIELD_TYPES.COLLECTION_REFERENCE) {
            if (metafield.reference) {
                value = {
                    id: (0, common_1.getIdFromGraphqlId)(metafield.reference.id),
                    title: metafield.reference.title,
                    products: metafield.reference.products.edges.map(function (edge) {
                        return _this.formatProduct(edge.node, level + 1);
                    })
                };
            }
            else {
                // SECOND LEVEL
                return {
                    type: type,
                    id: (0, common_1.getIdFromGraphqlId)(metafield.value)
                };
            }
        }
        if (type === common_1.METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
            if (metafield.references) {
                value = metafield.references.edges.map(function (reference) {
                    return _this.formatProduct(reference.node, level + 1);
                });
            }
            else {
                // SECOND LEVEL
                return {
                    type: type,
                    ids: JSON.parse(value).map(function (productId) { return (0, common_1.getIdFromGraphqlId)(productId); })
                };
            }
        }
        if (type === common_1.METAFIELD_TYPES.LIST_SINGLE_LINE_TEXT_FIELD) {
            value = JSON.parse(value);
        }
        return {
            type: type,
            value: value
        };
    };
    GraphqlResponseFormatter.prototype.formatFilters = function (filters, selectedFiltersFromRequestState, initialPriceRanges) {
        return filters.map(function (filter) {
            var selectedFilter = selectedFiltersFromRequestState[filter.id];
            var isCheckboxFilter = (filter.type === FILTER_TYPES.LIST || filter.type === FILTER_TYPES.BOOLEAN);
            var isPriceRangeFilter = (filter.type === FILTER_TYPES.PRICE_RANGE);
            if (isCheckboxFilter) {
                return {
                    id: filter.id,
                    name: filter.label,
                    type: "checkbox",
                    items: filter.values.map(function (filterItem) {
                        var selected = (selectedFilter && selectedFilter.includes(filterItem.id)) ? true : false;
                        return ({
                            id: filterItem.id,
                            name: filterItem.label,
                            count: filterItem.count,
                            selected: selected
                        });
                    })
                };
            }
            if (isPriceRangeFilter) {
                var parsedInput = JSON.parse(filter.values[0].input);
                var hasPriceRanges = initialPriceRanges.price_ranges;
                var filterItem = {
                    id: filter.id,
                    name: filter.label,
                    type: "range",
                    display_format: "{{currency_label}}{{value}}",
                    min: hasPriceRanges ? initialPriceRanges.price_ranges.min : parsedInput.price.min,
                    max: hasPriceRanges ? initialPriceRanges.price_ranges.max : parsedInput.price.max,
                };
                if (selectedFilter && selectedFilter.hasOwnProperty('selected_min')) {
                    filterItem['selected_min'] = selectedFilter.selected_min.toString();
                    filterItem['selected_max'] = selectedFilter.selected_max.toString();
                }
                return filterItem;
            }
        });
    };
    GraphqlResponseFormatter.getFilterInputs = function (filters) {
        var filterInputs = {};
        filters.forEach(function (filter) {
            var isCheckboxFilter = (filter.type === FILTER_TYPES.LIST || filter.type === FILTER_TYPES.BOOLEAN);
            var isPriceRangeFilter = (filter.type === FILTER_TYPES.PRICE_RANGE);
            if (isCheckboxFilter) {
                filter.values.forEach(function (filterItem) {
                    filterInputs[filterItem.id] = { type: "checkbox", input: filterItem.input, label: filterItem.label };
                });
            }
            if (isPriceRangeFilter) {
                filterInputs[filter.id] = {
                    type: "range",
                    input: filter.values[0].input,
                    label: filter.label
                };
            }
        });
        return filterInputs;
    };
    GraphqlResponseFormatter.prototype.getImagesToVariantIdsMap = function (variants) {
        var imagesToVariantIdsMap = {};
        variants.edges.forEach(function (variantEdge) {
            if (variantEdge.node.image) {
                if (!imagesToVariantIdsMap[variantEdge.node.image.id]) {
                    imagesToVariantIdsMap[variantEdge.node.image.id] = [];
                }
                imagesToVariantIdsMap[variantEdge.node.image.id].push(variantEdge.node.id);
            }
        });
        return imagesToVariantIdsMap;
    };
    return GraphqlResponseFormatter;
}());
exports.default = GraphqlResponseFormatter;
//# sourceMappingURL=grapqhl-to-common-response-formatter.js.map