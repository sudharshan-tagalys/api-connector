"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIConnector = void 0;
var configuration_1 = require("./lib/configuration");
var similarProductsWidget_1 = require("./similarProductsWidget");
var smartWidget_1 = require("./smartWidget");
exports.APIConnector = {
    SimilarProducts: {
        call: function (requestOptions) { return similarProductsWidget_1.default.call(requestOptions); },
    },
    SmartWidget: {
        call: function (requestOptions) { return smartWidget_1.default.call(requestOptions); },
    },
    setConfiguration: function (config) { return configuration_1.default.setConfiguration(config); },
};
//# sourceMappingURL=index.js.map