"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getProducts = function () {
    return this.responseState.products;
};
var getTotalProductsCount = function () {
    return this.responseState.total;
};
// ==== PUBLICLY EXPOSED HELPERS ====
var getRequestHelpers = function () {
    return {};
};
var getResponseHelpers = function () {
    var _a = this.productHelpers, getProducts = _a.getProducts, getTotalProductsCount = _a.getTotalProductsCount;
    return {
        getProducts: getProducts,
        getTotalProductsCount: getTotalProductsCount
    };
};
exports.default = {
    getProducts: getProducts,
    getTotalProductsCount: getTotalProductsCount,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers
};
//# sourceMappingURL=product.js.map