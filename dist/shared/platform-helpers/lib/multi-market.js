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
var configuration_1 = require("../../../lib/configuration");
var shopifyConfiguration_1 = require("../../../lib/shopifyConfiguration");
var common_1 = require("./common");
var MultiMarket = /** @class */ (function () {
    function MultiMarket() {
    }
    MultiMarket.prototype.getProductDetailsForMarket = function (productIds) {
        return __awaiter(this, void 0, void 0, function () {
            var productNodeIds, priceQuery, metafieldsToQuery, metafieldsQuery, identifier, response, responseJson, products, productDetailsForMarket;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!productIds.length)
                            return [2 /*return*/, {}];
                        productNodeIds = productIds.map(function (productId) { return "gid://shopify/Product/".concat(productId); });
                        priceQuery = "\n      variants(first: 250){\n        edges{\n          node{\n            id\n            price {\n              amount\n            }\n            compareAtPrice{\n              amount\n            }\n          }\n        }\n      }\n    ";
                        metafieldsToQuery = shopifyConfiguration_1.default.getMetafields();
                        metafieldsQuery = "";
                        if (Object.keys(metafieldsToQuery).length > 0) {
                            identifier = metafieldsToQuery.products.map(function (product_metafield) { return "{namespace: \"".concat(product_metafield.namespace, "\", key: \"").concat(product_metafield.key, "\"}"); });
                            metafieldsQuery = "\n        metafields(identifiers: [".concat(identifier, "]){\n          id\n          key\n          namespace\n          type\n          value\n          reference{\n            ... on Collection{\n              products(first: 10){\n                edges{\n                  node{\n                    id\n                    ").concat(priceQuery, "\n                    metafields(identifiers: [").concat(identifier, "]){\n                      id\n                      key\n                      namespace\n                      type\n                      value\n                    }\n                  }\n                }\n              }\n            }\n          }\n          references(first: 10){\n            edges{\n              node{\n                ... on Product{\n                  id\n                  ").concat(priceQuery, "\n                  metafields(identifiers: [").concat(identifier, "]){\n                    id\n                    key\n                    namespace\n                    type\n                    value\n                  }\n                }\n              }\n            }\n          }\n        }\n      ");
                        }
                        return [4 /*yield*/, fetch("https://".concat(shopifyConfiguration_1.default.getMyShopifyDomain(), "/api/").concat(common_1.API_VERSION, "/graphql.json"), {
                                body: " query allProducts @inContext(country: ".concat(configuration_1.default.getCountryCode(), ") {\n        nodes(ids: ").concat(JSON.stringify(productNodeIds), ")\n        {\n          ... on Product{\n            id\n            ").concat(metafieldsQuery, "\n            ").concat(priceQuery, "\n          }\n        }\n      }\n      "),
                                headers: {
                                    "Content-Type": "application/graphql",
                                    "X-Shopify-Storefront-Access-Token": shopifyConfiguration_1.default.getStorefrontAPIAccessToken(),
                                },
                                method: "POST",
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseJson = _a.sent();
                        products = responseJson.data.nodes;
                        productDetailsForMarket = {};
                        products.forEach(function (product) {
                            if (product) {
                                var productId = (0, common_1.getIdFromGraphqlId)(product.id);
                                productDetailsForMarket[productId] = _this.getMarketSpecificDetails(product);
                            }
                        });
                        return [2 /*return*/, productDetailsForMarket];
                }
            });
        });
    };
    MultiMarket.prototype.getMarketSpecificDetails = function (product) {
        var _this = this;
        var metafields = {};
        if (product.hasOwnProperty("metafields")) {
            product.metafields.forEach(function (metafield) {
                var _a;
                if (metafield) {
                    metafields[_a = metafield.namespace] || (metafields[_a] = {});
                    metafields[metafield.namespace][metafield.key] = {
                        type: metafield.type,
                        value: _this.getMetafieldValue(metafield)
                    };
                }
            });
        }
        var priceDetails = (0, common_1.getPriceDetails)(product);
        return __assign(__assign({}, priceDetails), { productId: (0, common_1.getIdFromGraphqlId)(product.id), metafields: metafields });
    };
    MultiMarket.prototype.getMetafieldValue = function (metafield) {
        var _this = this;
        var type = metafield.type;
        var value = metafield.value;
        if (type === common_1.METAFIELD_TYPES.COLLECTION_REFERENCE) {
            if (metafield.reference) {
                value = {
                    products: metafield.reference.products.edges.map(function (edge) {
                        return _this.getMarketSpecificDetails(edge.node);
                    })
                };
            }
        }
        if (type === common_1.METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
            if (metafield.references) {
                value = metafield.references.edges.map(function (reference) {
                    return _this.getMarketSpecificDetails(reference.node);
                });
            }
            // else {
            //   value = JSON.parse(value)
            // }
        }
        return value;
    };
    MultiMarket.prototype.updateProductDetailsForMarket = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var productIds, marketSpecificDetails_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!response.hasOwnProperty("products")) return [3 /*break*/, 2];
                        console.log("BEFORE MUTATION", JSON.stringify(response.products[0]));
                        productIds = response.products.map(function (product) { return product.id; });
                        return [4 /*yield*/, this.getProductDetailsForMarket(productIds)];
                    case 1:
                        marketSpecificDetails_1 = _a.sent();
                        response.products.forEach(function (product) {
                            var hasMarketSpecificDetails = marketSpecificDetails_1.hasOwnProperty(product.id);
                            hasMarketSpecificDetails ? _this.mutateProductDetails(product, marketSpecificDetails_1[product.id]) : _this.resetProductPrice(product);
                        });
                        console.log("AFTER MUTATION", JSON.stringify(response.products[0]));
                        _a.label = 2;
                    case 2: return [2 /*return*/, response];
                }
            });
        });
    };
    MultiMarket.prototype.mutateProductDetails = function (product, marketSpecificProductDetails) {
        product.variants.forEach(function (variant) {
            variant.price = marketSpecificProductDetails.variantPricesMap[variant.id].price;
            variant.compare_at_price = marketSpecificProductDetails.variantPricesMap[variant.id].compare_at_price;
        });
        product.price_varies = marketSpecificProductDetails.price_varies;
        product.compare_at_price_varies = marketSpecificProductDetails.compare_at_price_varies;
        product.price = marketSpecificProductDetails.price;
        product.compare_at_price = marketSpecificProductDetails.compare_at_price;
        product.price_min = marketSpecificProductDetails.price_min;
        product.price_max = marketSpecificProductDetails.price_max;
        product.compare_at_price_min = marketSpecificProductDetails.compare_at_price_min;
        product.compare_at_price_max = marketSpecificProductDetails.compare_at_price_max;
        this.updateMetafieldPrices(product.metafields, marketSpecificProductDetails.metafields);
    };
    MultiMarket.prototype.updateMetafieldPrices = function (metafields, marketSpecificMetafields) {
        for (var namespace in metafields) {
            for (var key in metafields[namespace]) {
                if (marketSpecificMetafields.hasOwnProperty(namespace) && marketSpecificMetafields[namespace].hasOwnProperty(key)) {
                    var marketSpecificValue = marketSpecificMetafields[namespace][key].value;
                    if (metafields[namespace][key]['type'] === common_1.METAFIELD_TYPES.COLLECTION_REFERENCE) {
                        this.updateCollectionReferenceMetafield(metafields[namespace][key], marketSpecificValue);
                    }
                    if (metafields[namespace][key]['type'] === common_1.METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
                        this.updateProductListReferenceMetafield(metafields[namespace][key], marketSpecificValue);
                    }
                }
                else {
                    delete metafields[namespace][key];
                    if (Object.keys(metafields[namespace]).length === 0) {
                        delete metafields[namespace];
                    }
                }
            }
        }
    };
    MultiMarket.prototype.idPresentInGivenList = function (ListOfIds, id) {
        var found = ListOfIds.find(function (listId) { return listId === id; });
        return found === id;
    };
    ;
    MultiMarket.prototype.updateCollectionReferenceMetafield = function (data, marketSpecificValue) {
        var _this = this;
        var hasProducts = (data.value && data.value.hasOwnProperty("products"));
        if (hasProducts) {
            if (Array.isArray(marketSpecificValue.products)) {
                var productsFromShopify_1 = marketSpecificValue.products.map(function (value) { return parseInt(value.productId); });
                data.value.products = data.value.products.filter(function (product) { return _this.idPresentInGivenList(productsFromShopify_1, parseInt(product.id)); });
                data.value.products.forEach(function (product) {
                    if (marketSpecificValue.hasOwnProperty("products")) {
                        marketSpecificValue.products.forEach(function (priceInfoForProduct) {
                            if (product.id === priceInfoForProduct.productId) {
                                _this.mutateProductDetails(product, priceInfoForProduct);
                            }
                        });
                    }
                });
            }
        }
        else {
            // RECURSIVE CALL, SECOND LEVEL METAFIELDS WON'T HAVE REFERENCES
        }
    };
    MultiMarket.prototype.updateProductListReferenceMetafield = function (data, marketSpecificValue) {
        var _this = this;
        if (Array.isArray(marketSpecificValue)) {
            var productsFromShopify_2 = marketSpecificValue.map(function (value) { return parseInt(value.productId); });
            data.value = data.value.filter(function (product) { return _this.idPresentInGivenList(productsFromShopify_2, parseInt(product.id)); });
            data.value.forEach(function (product) {
                marketSpecificValue.forEach(function (priceInfoForProduct) {
                    if (product.id === priceInfoForProduct.productId) {
                        _this.mutateProductDetails(product, priceInfoForProduct);
                    }
                });
            });
        }
    };
    MultiMarket.prototype.resetProductPrices = function (response) {
        var _this = this;
        if (response.products) {
            return response.products.forEach(function (product) { return _this.resetProductPrice(product); });
        }
        return response;
    };
    MultiMarket.prototype.resetProductPrice = function (product) {
        product.price_varies = null;
        product.compare_at_price_varies = null;
        product.price = null;
        product.compare_at_price = null;
        product.price_min = null;
        product.price_max = null;
        product.compare_at_price_min = null;
        product.compare_at_price_max = null;
        product.variants.map(function (variant) {
            variant.price = null;
            variant.compare_at_price = null;
        });
        this.resetMetafieldPrices(product.metafields);
    };
    MultiMarket.prototype.resetMetafieldPrices = function (metafields) {
        var _this = this;
        for (var namespace in metafields) {
            for (var key in metafields[namespace]) {
                var metafield = metafields[namespace][key];
                if (metafield['type'] === common_1.METAFIELD_TYPES.COLLECTION_REFERENCE) {
                    if (metafield.value && metafield.value.hasOwnProperty("products")) {
                        metafields[namespace][key].value.products.map(function (product) {
                            _this.resetProductPrice(product);
                        });
                    }
                }
                if (metafield['type'] === common_1.METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
                    if (metafield.value) {
                        metafield.value.map(function (product) {
                            if (typeof product === 'object') {
                                _this.resetProductPrice(product);
                            }
                        });
                    }
                }
            }
        }
    };
    MultiMarket.prototype.helpersToExpose = function () {
        var _this = this;
        return {
            updateProductDetailsForMarket: function (response) { return _this.updateProductDetailsForMarket(response); },
            resetProductPrices: function (response) { return _this.resetProductPrices(response); }
        };
    };
    MultiMarket.export = function () {
        var _this = this;
        return {
            MultiMarket: {
                new: function () {
                    var instance = new _this();
                    return instance.helpersToExpose();
                }
            }
        };
    };
    return MultiMarket;
}());
exports.default = MultiMarket;
//# sourceMappingURL=multi-market.js.map