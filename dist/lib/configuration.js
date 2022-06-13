"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Configuration.prototype.setConfiguration = function (configuration) {
        this.validateConfiguration(configuration);
        this.configuration = {
            identification: {
                client_code: configuration.credentials.clientCode,
                api_key: configuration.credentials.apiKey,
                store_id: configuration.storeId,
                currency: configuration.currencyCode,
                api_client: configuration.apiClient,
            },
            platform: configuration.platform,
            serverUrl: configuration.serverUrl,
            track: configuration.track,
            analyticsStorageConsentProvided: configuration.analyticsStorageConsentProvided,
        };
    };
    Configuration.prototype.validateConfiguration = function (configuration) {
        var _this = this;
        ["serverUrl", "credentials", "storeId", "currencyCode"].forEach(function (configProperty) {
            if (!configuration.hasOwnProperty(configProperty) || typeof configuration[configProperty] === "undefined") {
                throw new Error(_this.getConstructedErrorLabel(configProperty));
            }
        });
        var credentialProperties = ["clientCode", "apiKey"];
        credentialProperties.forEach(function (credentialsProperty) {
            if (!configuration.credentials.hasOwnProperty(credentialsProperty)) {
                throw new Error(_this.getConstructedErrorLabel(credentialsProperty));
            }
        });
    };
    Configuration.prototype.getConstructedErrorLabel = function (missingConfiguration) {
        return "".concat(missingConfiguration, " configuration is missing. Refer docs.");
    };
    Configuration.prototype.getConfiguration = function () {
        return this.configuration;
    };
    Configuration.prototype.getServerUrl = function () {
        return this.configuration.serverUrl;
    };
    Configuration.prototype.getApiIdentification = function () {
        return this.configuration.identification;
    };
    Configuration.prototype.getPlatform = function () {
        return this.configuration.platform.toLowerCase();
    };
    Configuration.prototype.analyticsStorageConsentProvided = function () {
        return this.configuration.analyticsStorageConsentProvided();
    };
    Configuration.prototype.canTrackAnalytics = function () {
        return (this.configuration.track && this.configuration.analyticsStorageConsentProvided());
    };
    return Configuration;
}());
exports.default = new Configuration();
//# sourceMappingURL=configuration.js.map