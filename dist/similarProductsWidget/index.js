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
var apiConnector_1 = require("../lib/apiConnector");
var SimilarProductsWidget = /** @class */ (function (_super) {
    __extends(SimilarProductsWidget, _super);
    function SimilarProductsWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimilarProductsWidget.prototype.getRequestOptions = function () {
        return {
            path: "products/".concat(this.requestOptions.params.productId, "/similar"),
            params: {
                request: ["result", "details"],
                max_products: this.requestOptions.params.limit || 16,
            },
        };
    };
    SimilarProductsWidget.prototype.exporterName = function () {
        return 'SimilarProducts';
    };
    SimilarProductsWidget.prototype.formatResponse = function (response) {
        return this.responseFormatter.similarProducts(response);
    };
    SimilarProductsWidget.prototype.isFailureResponse = function (response) {
        return response.status != "OK";
    };
    SimilarProductsWidget.prototype.extractAnalyticsData = function (response) {
        var plDetails = {};
        if (response.hasOwnProperty("sku")) {
            plDetails["sku"] = response.sku;
        }
        var productSkus = response["details"].map(function (product) { return product.sku; });
        return {
            event_type: "product_list",
            event_details: {
                pl_type: "widget-similar_products",
                pl_details: plDetails,
                pl_products: productSkus,
                pl_total: productSkus.length
            }
        };
    };
    return SimilarProductsWidget;
}(apiConnector_1.default));
exports.default = new SimilarProductsWidget();
//# sourceMappingURL=index.js.map