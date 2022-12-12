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
var Recommendations = /** @class */ (function (_super) {
    __extends(Recommendations, _super);
    function Recommendations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Recommendations.exporterName = function () {
        return 'Recommendations';
    };
    Recommendations.prototype.formatResponse = function (response) {
        return this.responseFormatter.recommendations(response);
    };
    Recommendations.prototype.getRequestOptions = function () {
        return {
            path: "recommendations/".concat(this.requestOptions.params.recommendationId),
            params: {
                product_id: this.requestOptions.params.productId,
                limit: (this.requestOptions.params.limit || 16)
            }
        };
    };
    Recommendations.prototype.getHelpersToExpose = function (response, formattedResponse) {
        var _this = this;
        return {
            getAnalyticsData: function () { return _this.extractAnalyticsData(response); },
            getProducts: function () { return formattedResponse ? formattedResponse.products : []; }
        };
    };
    Recommendations.prototype.extractAnalyticsData = function (response) {
        if (response === false) {
            return {};
        }
        var plDetails = {
            id: this.requestOptions.params.recommendationId,
            product_id: this.requestOptions.params.productId,
            name: response.name,
            widget_name: response.widget_name
        };
        if (response.hasOwnProperty("sku")) {
            plDetails["product"] = response.sku;
        }
        var productSkus = response["details"].map(function (product) { return product.sku; });
        return {
            event_type: "product_list",
            event_details: {
                pl_type: "product-based-widget",
                pl_details: plDetails,
                pl_products: productSkus,
                pl_total: productSkus.length
            }
        };
    };
    return Recommendations;
}(apiConnector_1.default));
exports.default = Recommendations;
//# sourceMappingURL=index.js.map