"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("../../../lib/configuration");
var formatter_1 = require("./formatter");
var shopifyResponseFormatter_1 = require("./shopifyResponseFormatter");
var responseFormatter = function () {
    if (configuration_1.default.getPlatform() === 'shopify') {
        return new shopifyResponseFormatter_1.default();
    }
    return new formatter_1.default();
};
exports.default = {
    responseFormatter: responseFormatter
};
//# sourceMappingURL=formatFactory.js.map