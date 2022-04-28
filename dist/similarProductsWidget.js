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
var connector_1 = require("./lib/connector");
var SimilarProductsWidget = /** @class */ (function (_super) {
    __extends(SimilarProductsWidget, _super);
    function SimilarProductsWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimilarProductsWidget.prototype.path = function () {
        return "/products/".concat(this.requestOptions.params.product, "/similar");
    };
    SimilarProductsWidget.prototype.extractAnalyticsData = function (data) {
        return data["results"];
    };
    return SimilarProductsWidget;
}(connector_1.default));
exports.default = new SimilarProductsWidget();
//# sourceMappingURL=similarProductsWidget.js.map