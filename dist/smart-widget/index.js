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
var SmartWidget = /** @class */ (function (_super) {
    __extends(SmartWidget, _super);
    function SmartWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartWidget.prototype.getRequestOptions = function () {
        return {
            path: "custom_widgets/".concat(this.requestOptions.params.widgetId),
            params: {
                request: ["result", "details"],
                max_products: this.requestOptions.params.limit || 16,
            },
        };
    };
    SmartWidget.prototype.exporterName = function () {
        return 'SmartWidget';
    };
    SmartWidget.prototype.formatResponse = function (response) {
        return this.responseFormatter.smartWidgets(response);
    };
    SmartWidget.prototype.extractAnalyticsData = function (response) {
        var plDetails = {
            id: this.requestOptions.params.widgetId,
            title: response.name
            // TODO: confirm url
        };
        var productSkus = response["details"].map(function (product) { return product.sku; });
        return {
            event_type: "product_list",
            event_details: {
                pl_type: "widget-custom",
                pl_details: plDetails,
                pl_products: productSkus,
                pl_total: productSkus.length
            }
        };
    };
    return SmartWidget;
}(apiConnector_1.default));
exports.default = new SmartWidget();
//# sourceMappingURL=index.js.map