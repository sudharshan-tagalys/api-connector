"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalContextToPlatformHelpers = void 0;
var configuration_1 = require("../../lib/configuration");
var shopifyConfiguration_1 = require("../../lib/shopifyConfiguration");
var TagalysPlatformHelpers = require("../../../node_modules/platform-helpers").default;
var setGlobalContextToPlatformHelpers = function () {
    TagalysPlatformHelpers.globalContext.set({
        configuration: configuration_1.default,
        shopifyConfiguration: shopifyConfiguration_1.default
    });
};
exports.setGlobalContextToPlatformHelpers = setGlobalContextToPlatformHelpers;
exports.default = TagalysPlatformHelpers;
//# sourceMappingURL=index.js.map