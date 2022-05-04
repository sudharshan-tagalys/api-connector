"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIConnector = void 0;
var api_1 = require("./lib/api");
var similarProductsWidget_1 = require("./similarProductsWidget");
exports.APIConnector = {
    SimilarProducts: {
        call: function (requestOptions) { return similarProductsWidget_1.default.call(requestOptions); },
    },
    setConfiguration: function (configuration) { return api_1.default.setConfiguration(configuration); },
    getCurrency: function () { return api_1.default.getCurrency(); },
};
//# sourceMappingURL=index.js.map