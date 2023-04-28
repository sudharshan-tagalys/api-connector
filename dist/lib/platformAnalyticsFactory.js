"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var shopifyAnalyticsTracker_1 = require("./shopifyAnalyticsTracker");
var magentoAnalyticsTracker_1 = require("./magentoAnalyticsTracker");
var platformAnalyticsTracker_1 = require("./platformAnalyticsTracker");
var platformAnalyticsTracker = function (eventTypes) {
    if (configuration_1.default.getPlatform() === 'shopify') {
        return new shopifyAnalyticsTracker_1.default(eventTypes);
    }
    if (configuration_1.default.getPlatform() === 'magento') {
        return new magentoAnalyticsTracker_1.default(eventTypes);
    }
    return new platformAnalyticsTracker_1.default(eventTypes);
};
exports.default = {
    tracker: platformAnalyticsTracker
};
//# sourceMappingURL=platformAnalyticsFactory.js.map