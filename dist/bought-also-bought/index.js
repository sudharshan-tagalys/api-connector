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
var BoughtAlsoBought = /** @class */ (function (_super) {
    __extends(BoughtAlsoBought, _super);
    function BoughtAlsoBought() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoughtAlsoBought.prototype.getRequestOptions = function () {
        return {
            path: "products/".concat(this.requestOptions.params.productId, "/bought_also_bought"),
            params: {
                request: ["result", "details"],
                max_products: this.requestOptions.params.limit || 16,
            },
        };
    };
    BoughtAlsoBought.prototype.exporterName = function () {
        return 'BoughtAlsoBought';
    };
    BoughtAlsoBought.prototype.formatResponse = function (response) {
        return this.responseFormatter.boughtAlsoBought(response);
    };
    BoughtAlsoBought.prototype.extractAnalyticsData = function (response) {
        var plDetails = {};
        if (response.hasOwnProperty("sku")) {
            plDetails["product"] = response.sku;
        }
        var productSkus = response["details"].map(function (product) { return product.sku; });
        return {
            event_type: "product_list",
            event_details: {
                pl_type: "widget-bought_also_bought",
                pl_details: plDetails,
                pl_products: productSkus,
                pl_total: productSkus.length
            }
        };
    };
    return BoughtAlsoBought;
}(apiConnector_1.default));
exports.default = new BoughtAlsoBought();
//# sourceMappingURL=index.js.map