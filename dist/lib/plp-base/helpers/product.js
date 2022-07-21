"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasNoSearchResults = function () {
    return (this.productHelpers.getTotalProductsCount() === 0 || this.responseState.hasOwnProperty("error"));
};
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
    var _a = this.productHelpers, getProducts = _a.getProducts, getTotalProductsCount = _a.getTotalProductsCount, hasNoSearchResults = _a.hasNoSearchResults;
    return {
        getProducts: getProducts,
        hasNoSearchResults: hasNoSearchResults,
        getTotalProductsCount: getTotalProductsCount
    };
};
exports.default = {
    getProducts: getProducts,
    getTotalProductsCount: getTotalProductsCount,
    getRequestHelpers: getRequestHelpers,
    getResponseHelpers: getResponseHelpers,
    hasNoSearchResults: hasNoSearchResults,
};
//# sourceMappingURL=product.js.map