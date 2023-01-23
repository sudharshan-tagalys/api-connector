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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnector_1 = require("../lib/apiConnector");
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Widget.prototype.getRequestOptions = function () {
        return {
            path: this.path(),
            params: this.getParams()
        };
    };
    Widget.prototype.getParams = function () {
        return {
            request: ["result", "details"],
            max_products: this.requestOptions.params.limit || 16,
        };
    };
    Widget.prototype.path = function () {
        return "";
    };
    Widget.prototype.plType = function () {
        return "";
    };
    Widget.prototype.getHelpersToExpose = function (response, formattedResponse) {
        var _this = this;
        return __assign(__assign({}, _super.prototype.getHelpersToExpose.call(this, response, formattedResponse)), { getAnalyticsData: function () { return _this.extractAnalyticsData(response); }, getProducts: function () { return formattedResponse ? formattedResponse.products : []; } });
    };
    Widget.prototype.extractAnalyticsData = function (response) {
        if (response === false) {
            return {};
        }
        var plDetails = {};
        if (response.hasOwnProperty("sku")) {
            plDetails["product"] = response.sku;
        }
        var productSkus = response["details"].map(function (product) { return product.sku; });
        return {
            event_type: "product_list",
            event_details: {
                pl_type: this.plType(),
                pl_details: plDetails,
                pl_products: productSkus,
                pl_total: productSkus.length
            }
        };
    };
    return Widget;
}(apiConnector_1.default));
exports.default = Widget;
//# sourceMappingURL=widget.js.map