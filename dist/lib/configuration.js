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
            apiServer: configuration.apiServer,
            track: configuration.track,
            trackingConsentProvided: configuration.trackingConsentProvided,
        };
    };
    Configuration.prototype.getConfiguration = function () {
        return this.configuration;
    };
    Configuration.prototype.getApiServer = function () {
        return this.configuration.apiServer;
    };
    Configuration.prototype.getApiIdentification = function () {
        console.log(this.configuration);
        return this.configuration.identification;
    };
    Configuration.prototype.canTrackAnalytics = function () {
        return (this.configuration.track && this.configuration.trackingConsentProvided());
    };
    return Configuration;
}());
exports.default = new Configuration();
//# sourceMappingURL=configuration.js.map