"use strict";
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
var common_1 = require("../common");
var unique = function (value, index, self) {
    return self.indexOf(value) === index;
};
var ShopifyMultiCurrencyPriceMutator = /** @class */ (function () {
    function ShopifyMultiCurrencyPriceMutator() {
    }
    ShopifyMultiCurrencyPriceMutator.prototype.mutate = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var productIds, prices_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!response.products) return [3 /*break*/, 2];
                        productIds = response.products.map(function (product) { return product.id; });
                        return [4 /*yield*/, (0, common_1.getProductPrices)(productIds, configuration_1.default.getCountryCode())];
                    case 1:
                        prices_1 = _a.sent();
                        response.products.forEach(function (product) {
                            var hasPriceInfo = prices_1.hasOwnProperty(product.id);
                            hasPriceInfo ? _this.mutateProductPrice(product, prices_1[product.id]) : _this.resetProductPrice(product);
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/, response];
                }
            });
        });
    };
    ShopifyMultiCurrencyPriceMutator.prototype.mutateProductPrice = function (product, priceInfo) {
        product.variants.forEach(function (variant) {
            variant.price = priceInfo.variantPrices[variant.id].price;
            variant.compare_at_price = priceInfo.variantPrices[variant.id].compareAtPrice;
        });
        var variantCompareAtPrices = this.getVariantCompareAtPrices(product.variants);
        var variantPrices = this.getVariantPrices(product.variants);
        product.price_varies = variantPrices.filter(unique).length > 1;
        product.compare_at_price_varies = variantCompareAtPrices.filter(unique).length > 1;
        product.price = priceInfo.price;
        product.compare_at_price = priceInfo.compareAtPrice;
        product.price_min = this.getMin(variantPrices);
        product.price_max = this.getMax(variantPrices);
        product.compare_at_price_min = this.getMin(variantCompareAtPrices);
        product.compare_at_price_max = this.getMax(variantCompareAtPrices);
    };
    ShopifyMultiCurrencyPriceMutator.prototype.resetProductPrices = function (response) {
        var _this = this;
        if (response.products) {
            return response.products.forEach(function (product) { return _this.resetProductPrice(product); });
        }
        return response;
    };
    ShopifyMultiCurrencyPriceMutator.prototype.getVariantPrices = function (variants) {
        return variants.filter(function (variant) { return variant.price !== null; }).map(function (variant) { return variant.price; });
    };
    ShopifyMultiCurrencyPriceMutator.prototype.getVariantCompareAtPrices = function (variants) {
        return variants.filter(function (variant) { return variant.compare_at_price !== null; }).map(function (variant) { return variant.compare_at_price; });
    };
    ShopifyMultiCurrencyPriceMutator.prototype.getMin = function (prices) {
        return prices.length > 0 ? Math.min.apply(Math, prices) : 0;
    };
    ShopifyMultiCurrencyPriceMutator.prototype.getMax = function (prices) {
        return prices.length > 0 ? Math.max.apply(Math, prices) : 0;
    };
    ShopifyMultiCurrencyPriceMutator.prototype.resetProductPrice = function (product) {
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
    };
    return ShopifyMultiCurrencyPriceMutator;
}());
exports.default = ShopifyMultiCurrencyPriceMutator;
//# sourceMappingURL=shopifyMultiCurrencyPriceMutator.js.map