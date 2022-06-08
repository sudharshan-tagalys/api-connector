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
var widget_1 = require("../lib/widget");
var AddedToCartAlsoAddedToCart = /** @class */ (function (_super) {
    __extends(AddedToCartAlsoAddedToCart, _super);
    function AddedToCartAlsoAddedToCart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddedToCartAlsoAddedToCart.prototype.exporterName = function () {
        return 'AddedToCartAlsoAddedToCart';
    };
    AddedToCartAlsoAddedToCart.prototype.path = function () {
        return "products/".concat(this.requestOptions.params.productId, "/atc_also_atc");
    };
    AddedToCartAlsoAddedToCart.prototype.plType = function () {
        return 'widget-atc_also_atc';
    };
    AddedToCartAlsoAddedToCart.prototype.formatResponse = function (response) {
        return this.responseFormatter.addedToCartAlsoAddedToCart(response);
    };
    return AddedToCartAlsoAddedToCart;
}(widget_1.default));
exports.default = new AddedToCartAlsoAddedToCart();
//# sourceMappingURL=index.js.map