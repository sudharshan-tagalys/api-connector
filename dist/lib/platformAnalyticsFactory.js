"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var shopifyAnalyticsTracker_1 = require("./shopifyAnalyticsTracker");
var magentoAnalyticsTracker_1 = require("./magentoAnalyticsTracker");
var platformAnalyticsTracker_1 = require("./platformAnalyticsTracker");
var platformAnalyticsTracker = function () {
    if (configuration_1.default.getPlatform() === 'shopify') {
        return new shopifyAnalyticsTracker_1.default();
    }
    if (configuration_1.default.getPlatform() === 'magento') {
        return new magentoAnalyticsTracker_1.default();
    }
    return new platformAnalyticsTracker_1.default();
};
exports.default = {
    tracker: platformAnalyticsTracker
};
//# sourceMappingURL=platformAnalyticsFactory.js.map