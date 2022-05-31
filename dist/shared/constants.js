"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REQUEST_OPTIONS = exports.DEFAULT_CONFIGURATION = exports.SHOPIFY_PLATFORM = void 0;
var SHOPIFY_PLATFORM = "shopify";
exports.SHOPIFY_PLATFORM = SHOPIFY_PLATFORM;
var DEFAULT_CONFIGURATION = {
    platform: "custom",
    apiClient: {
        vendor: "tagalys",
        language: "js",
        version: "3",
        release: "1",
    },
    track: true,
    analyticsStorageConsentProvided: function () {
        return false;
    }
};
exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;
var DEFAULT_REQUEST_OPTIONS = {
    configuration: {},
    onSuccess: function (response) {
        console.log("API response:", response);
    },
    onFailure: function (response) {
        console.error("Failed API response:", response);
    }
};
exports.DEFAULT_REQUEST_OPTIONS = DEFAULT_REQUEST_OPTIONS;
//# sourceMappingURL=constants.js.map