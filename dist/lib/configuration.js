"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Configuration.prototype.setConfiguration = function (configuration) {
        this.configuration = {
            identification: {
                client_code: configuration.credentials.clientCode,
                api_key: configuration.credentials.apiKey,
                store_id: configuration.storeId,
                currency: configuration.currencyCode,
                // TODO: Confirm whether the API client should be dynamic
                api_client: {
                    vendor: "tagalys",
                    language: "js",
                    version: "3",
                    release: "1",
                },
            },
            platform: configuration.platform,
            apiServer: configuration.apiServer,
            track: configuration.track,
            analyticsStorageConsentProvided: configuration.analyticsStorageConsentProvided,
        };
    };
    Configuration.prototype.getConfiguration = function () {
        return this.configuration;
    };
    Configuration.prototype.getApiServer = function () {
        return this.configuration.apiServer;
    };
    Configuration.prototype.getApiIdentification = function () {
        return this.configuration.identification;
    };
    Configuration.prototype.getPlatform = function () {
        return this.configuration.platform.toLowerCase();
    };
    Configuration.prototype.analyticsStorageConsentProvided = function () {
        return this.analyticsStorageConsentProvided();
    };
    Configuration.prototype.canTrackAnalytics = function () {
        return (this.configuration.track && this.configuration.analyticsStorageConsentProvided());
    };
    return Configuration;
}());
exports.default = new Configuration();
//# sourceMappingURL=configuration.js.map