"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_LEVEL_SUPPORTED = 1;
var GraphqlQueries = /** @class */ (function () {
    function GraphqlQueries() {
        var _this = this;
        this.getImages = function () {
            return "\n      images(first: 250, sortKey: POSITION){\n        edges{\n          node{\n            altText\n            height\n            url\n            width\n            id\n          }\n        }\n      }\n    ";
        };
        this.getBasicProductDetails = function () {
            return "\n      id\n      title\n      handle\n      onlineStoreUrl\n      productType\n      vendor\n      tags\n      totalInventory\n      publishedAt\n      availableForSale\n      options{\n        id\n        name\n        values\n      }\n      featuredImage{\n        altText\n        height\n        url\n        width\n        id\n      }\n      priceRange{\n        minVariantPrice{\n          amount\n        }\n        maxVariantPrice{\n          amount\n        }\n      }\n      compareAtPriceRange{\n        minVariantPrice{\n          amount\n        }\n        maxVariantPrice{\n          amount\n        }\n      }\n      featuredImage{\n        altText\n        height\n        url\n        width\n        id\n      }\n    ";
        };
        this.getMedia = function () {
            return "\n      media(first: 250){\n        edges{\n          node{\n            alt\n            mediaContentType\n            ... on Video {\n              id\n              mediaContentType\n              previewImage{\n                id\n                altText\n                width\n                height\n                url\n              }\n              alt\n              sources {\n                format\n                height\n                mimeType\n                width\n                url\n              }\n            }\n            ... on MediaImage{\n              id\n              mediaContentType\n              previewImage{\n                id\n                altText\n                width\n                height\n                url\n              }\n              image{\n                id\n                altText\n                width\n                height\n                url\n              }\n            }\n            ... on ExternalVideo{\n              id\n              mediaContentType\n            }\n            ... on Model3d{\n              id\n              mediaContentType\n            }\n          }\n        }\n      }\n    ";
        };
        this.getVariants = function () {
            return "\n      variants(first: 250){\n        edges{\n          node{\n            id\n            title\n            quantityAvailable\n            sku\n            selectedOptions{\n              name\n              value\n            }\n            image{\n              id\n            }\n            availableForSale\n            price {\n              amount\n            }\n            compareAtPrice{\n              amount\n            }\n          }\n        }\n      }\n    ";
        };
        this.getReferenceMetafields = function (level) {
            if (level >= MAX_LEVEL_SUPPORTED) {
                return "";
            }
            level += 1;
            return "\n      reference{\n        ... on Product{\n          ".concat(_this.getBasicProductDetails(), "\n          ").concat(_this.getVariants(), "\n          ").concat(_this.getImages(), "\n          ").concat(_this.getMedia(), "     \n          ").concat(_this.getProductMetafields(level), "\n        }\n        ... on Collection{\n          id\n          title\n          products(first: 10){\n            edges{\n              node{\n                ").concat(_this.getBasicProductDetails(), "\n                ").concat(_this.getVariants(), "\n                ").concat(_this.getImages(), "\n                ").concat(_this.getMedia(), "     \n                ").concat(_this.getProductMetafields(level), "           \n              }\n            }\n          }\n        }\n      }\n      references(first: 10){\n        edges{\n          node{\n            ... on Product{\n              ").concat(_this.getBasicProductDetails(), "\n              ").concat(_this.getVariants(), "\n              ").concat(_this.getImages(), "\n              ").concat(_this.getMedia(), "\n              ").concat(_this.getProductMetafields(level), "\n            }\n          }\n        }\n      }\n    ");
        };
        this.getProductMetafields = function (level) {
            if (level === void 0) { level = 0; }
            return "\n      metafields(identifiers: $product_metafields){\n        id\n        key\n        namespace\n        type\n        value\n        description\n        ".concat(_this.getReferenceMetafields(level), "\n      }\n    ");
        };
        this.getProductDetails = function () {
            return "\n      ".concat(_this.getBasicProductDetails(), "\n      ").concat(_this.getVariants(), "\n      ").concat(_this.getImages(), "\n      ").concat(_this.getMedia(), "\n      ").concat(_this.getProductMetafields(), "\n    ");
        };
    }
    GraphqlQueries.getFilters = function () {
        return "\n      filters {\n        id\n        label\n        type\n        values {\n          id\n          label\n          count\n          input\n        }\n      }\n    ";
    };
    return GraphqlQueries;
}());
exports.default = GraphqlQueries;
//# sourceMappingURL=graphql-queries.js.map