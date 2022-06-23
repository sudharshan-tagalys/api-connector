"use strict";
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
exports.APIConnector = void 0;
var configuration_1 = require("./lib/configuration");
var constants_1 = require("./shared/constants");
var similar_products_widget_1 = require("./similar-products-widget");
var smart_widget_1 = require("./smart-widget");
var bought_also_bought_1 = require("./bought-also-bought");
var viewed_also_viewed_1 = require("./viewed-also-viewed");
var added_to_cart_also_added_to_cart_1 = require("./added-to-cart-also-added-to-cart");
var search_suggestions_1 = require("./search-suggestions");
var search_1 = require("./search");
var queryStringManager_1 = require("./lib/queryStringManager");
exports.APIConnector = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, search_1.default.export()), similar_products_widget_1.default.export()), smart_widget_1.default.export()), bought_also_bought_1.default.export()), viewed_also_viewed_1.default.export()), added_to_cart_also_added_to_cart_1.default.export()), search_suggestions_1.default.export()), { setConfiguration: function (config) { return configuration_1.default.setConfiguration(__assign(__assign({}, constants_1.DEFAULT_CONFIGURATION), config)); }, test: function () { return console.log("TEST"); }, setQueryStringConfiguration: function (config) { return queryStringManager_1.default.setConfiguration(config); } });
window.addEventListener("load", function () {
    var event = new Event("tagalys:ready");
    document.dispatchEvent(event);
});
//# sourceMappingURL=index.js.map