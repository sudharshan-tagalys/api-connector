"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var ShopifyConfiguration = /** @class */ (function () {
    function ShopifyConfiguration() {
    }
    ShopifyConfiguration.prototype.canWaitForStorefrontAPI = function () {
        var platformConfiguration = configuration_1.default.getPlatformConfiguration();
        if (!platformConfiguration.hasOwnProperty("waitForStorefrontAPI")) {
            return true;
        }
        return platformConfiguration.waitForStorefrontAPI;
    };
    ShopifyConfiguration.prototype.hasMetafields = function () {
        var platformConfiguration = configuration_1.default.getPlatformConfiguration();
        return (platformConfiguration && platformConfiguration.hasOwnProperty('metafields'));
    };
    ShopifyConfiguration.prototype.getMetafields = function () {
        var platformConfiguration = configuration_1.default.getPlatformConfiguration();
        return (platformConfiguration.metafields);
    };
    ShopifyConfiguration.prototype.isMetafieldConfigured = function (namespace, key, scope) {
        var metafields = this.getMetafields();
        if (Object.keys(metafields).length > 0) {
            var configured = metafields[scope].find(function (metafield) { return ((metafield.namespace === namespace) && (metafield.key === key)); });
            return (configured || false);
        }
        return false;
    };
    ShopifyConfiguration.prototype.getStorefrontAPIAccessToken = function () {
        return configuration_1.default.getPlatformConfiguration().storefrontAPI.accessToken;
    };
    ShopifyConfiguration.prototype.getMyShopifyDomain = function () {
        return configuration_1.default.getPlatformConfiguration().storefrontAPI.myShopifyDomain;
    };
    ShopifyConfiguration.prototype.useStorefrontAPIForSecondaryMarkets = function () {
        return (configuration_1.default.isShopify() && configuration_1.default.getPlatformConfiguration().useStorefrontAPIForSecondaryMarkets === true);
    };
    return ShopifyConfiguration;
}());
exports.default = new ShopifyConfiguration();
//# sourceMappingURL=shopifyConfiguration.js.map