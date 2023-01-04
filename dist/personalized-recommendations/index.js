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
var analyticsTracker_1 = require("../lib/analyticsTracker");
var apiConnector_1 = require("../lib/apiConnector");
var cookie_1 = require("../lib/cookie");
var PersonalizedRecommendations = /** @class */ (function (_super) {
    __extends(PersonalizedRecommendations, _super);
    function PersonalizedRecommendations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonalizedRecommendations.exporterName = function () {
        return 'PersonalizedRecommendations';
    };
    PersonalizedRecommendations.prototype.formatResponse = function (response) {
        return this.responseFormatter.personalizedRecommendations(response);
    };
    PersonalizedRecommendations.prototype.getRequestOptions = function () {
        return {
            path: "recommendations/personalized",
            params: {
                per_page: this.getLimit(),
                zero_state: this.getZeroStateParams(),
                request: ["results", "details"],
                user: {
                    // user_id: "", //
                    device_id: cookie_1.default.get(analyticsTracker_1.COOKIES.TA_DEVICE), //TA_DEVICE
                }
            }
        };
    };
    PersonalizedRecommendations.prototype.getLimit = function () {
        if (this.requestOptions.hasOwnProperty("params") && this.requestOptions.params.hasOwnProperty("limit")) {
            return this.requestOptions.params.limit;
        }
        return 16;
    };
    PersonalizedRecommendations.prototype.getZeroStateParams = function () {
        if (this.requestOptions.hasOwnProperty("params") && this.requestOptions.params.hasOwnProperty("zero_state")) {
            return this.requestOptions.params.zero_state;
        }
        return 'bestsellers';
    };
    PersonalizedRecommendations.prototype.getHelpersToExpose = function (response, formattedResponse) {
        var _this = this;
        return __assign(__assign({}, _super.prototype.getHelpersToExpose.call(this, response, formattedResponse)), { getAnalyticsData: function () { return _this.extractAnalyticsData(response); }, getProducts: function () { return formattedResponse ? formattedResponse.products : []; } });
    };
    PersonalizedRecommendations.prototype.extractAnalyticsData = function (response) {
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
                pl_type: "widget-personalized",
                pl_details: plDetails,
                pl_products: productSkus,
                pl_total: productSkus.length
            }
        };
    };
    return PersonalizedRecommendations;
}(apiConnector_1.default));
exports.default = PersonalizedRecommendations;
//# sourceMappingURL=index.js.map