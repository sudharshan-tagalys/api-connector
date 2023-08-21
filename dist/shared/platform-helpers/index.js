"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalContextToPlatformHelpers = void 0;
var configuration_1 = require("../../lib/configuration");
var shopifyConfiguration_1 = require("../../lib/shopifyConfiguration");
var platform_helpers_1 = require("platform-helpers");
var setGlobalContextToPlatformHelpers = function () {
    platform_helpers_1.default.globalContext.set({
        configuration: configuration_1.default,
        shopifyConfiguration: shopifyConfiguration_1.default
    });
};
exports.setGlobalContextToPlatformHelpers = setGlobalContextToPlatformHelpers;
exports.default = platform_helpers_1.default;
//# sourceMappingURL=index.js.map