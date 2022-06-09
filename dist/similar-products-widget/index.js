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
var SimilarProductsWidget = /** @class */ (function (_super) {
    __extends(SimilarProductsWidget, _super);
    function SimilarProductsWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimilarProductsWidget.exporterName = function () {
        return 'SimilarProducts';
    };
    SimilarProductsWidget.prototype.path = function () {
        return "products/".concat(this.requestOptions.params.productId, "/similar");
    };
    SimilarProductsWidget.prototype.plType = function () {
        return "widget-similar_products";
    };
    SimilarProductsWidget.prototype.formatResponse = function (response) {
        return this.responseFormatter.similarProducts(response);
    };
    SimilarProductsWidget.prototype.isFailureResponse = function (response) {
        return response.status != "OK";
    };
    return SimilarProductsWidget;
}(widget_1.default));
exports.default = SimilarProductsWidget;
//# sourceMappingURL=index.js.map