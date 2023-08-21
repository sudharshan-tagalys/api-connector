"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_FORMAT = exports.DEFAULT_REQUEST_CALLBACKS = exports.DEFAULT_CONFIGURATION = exports.SHOPIFY_PLATFORM = void 0;
var packageDetails_1 = require("../packageDetails");
var SHOPIFY_PLATFORM = "shopify";
exports.SHOPIFY_PLATFORM = SHOPIFY_PLATFORM;
var DEFAULT_CONFIGURATION = {
    platform: "custom",
    platformVariables: {},
    apiClient: packageDetails_1.default,
    track: true,
    analyticsStorageConsentProvided: function () {
        return false;
    }
};
exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;
var DEFAULT_REQUEST_CALLBACKS = {
    onSuccess: function (response) {
        console.log("API response:", response);
    },
    beforeAPICall: function (params) { return params; },
    onFailure: function (response) {
        console.error("Failed API response:", response);
    }
};
exports.DEFAULT_REQUEST_CALLBACKS = DEFAULT_REQUEST_CALLBACKS;
var REQUEST_FORMAT = {
    FORM_DATA: "FormData",
    JSON: "JSON",
    GRAPHQL: "GRAPHQL"
};
exports.REQUEST_FORMAT = REQUEST_FORMAT;
//# sourceMappingURL=constants.js.map