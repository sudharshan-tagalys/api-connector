"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIConnector = void 0;
var api_1 = require("./lib/api");
var similarProductsWidget_1 = require("./similarProductsWidget");
exports.APIConnector = {
    SimilarProducts: {
        call: function (requestOptions) { return similarProductsWidget_1.default.call(requestOptions); },
    },
    setConfiguration: function (identification) { return api_1.default.setApiIdentification(identification); },
};
module.exports = {
    APIConnector: exports.APIConnector
};
exports.default = exports.APIConnector;
//# sourceMappingURL=index.js.map