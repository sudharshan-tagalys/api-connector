"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_FORMAT = exports.DEFAULT_REQUEST_OPTIONS = exports.DEFAULT_CONFIGURATION = exports.SHOPIFY_PLATFORM = void 0;
var SHOPIFY_PLATFORM = "shopify";
exports.SHOPIFY_PLATFORM = SHOPIFY_PLATFORM;
var DEFAULT_CONFIGURATION = {
    platform: "custom",
    apiClient: {
        vendor: "tagalys-api-connector",
        language: "js",
        version: "1",
        release: "1",
    },
    track: true,
    analyticsStorageConsentProvided: function () {
        return false;
    }
};
exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;
var DEFAULT_REQUEST_OPTIONS = {
    onSuccess: function (response) {
        console.log("API response:", response);
    },
    beforeAPICall: function (params) { },
    onFailure: function (response) {
        console.error("Failed API response:", response);
    }
};
exports.DEFAULT_REQUEST_OPTIONS = DEFAULT_REQUEST_OPTIONS;
var REQUEST_FORMAT = {
    FORM_DATA: "FormData",
    JSON: "JSON"
};
exports.REQUEST_FORMAT = REQUEST_FORMAT;
//# sourceMappingURL=constants.js.map