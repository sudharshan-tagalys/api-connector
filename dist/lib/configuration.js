"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Configuration.prototype.setConfiguration = function (configuration) {
        this.validateConfiguration(configuration);
        this.configuration = {
            api: {
                serverUrl: configuration.api.serverUrl,
                credentials: {
                    clientCode: configuration.api.credentials.clientCode,
                    apiKey: configuration.api.credentials.apiKey,
                },
                storeId: configuration.api.storeId,
            },
            platform: configuration.platform,
            countryCode: configuration.countryCode,
            baseCountryCode: configuration.baseCountryCode,
            platformVariables: configuration.platformVariables,
            currency: {
                code: configuration.currency.code,
                exchangeRate: configuration.currency.exchangeRate,
                fractionalDigits: configuration.currency.fractionalDigits
            },
            apiClient: configuration.apiClient,
            track: configuration.track,
            analyticsStorageConsentProvided: configuration.analyticsStorageConsentProvided
        };
    };
    Configuration.prototype.validateConfiguration = function (configuration) {
        var _this = this;
        if (!configuration.hasOwnProperty('api')) {
            throw new Error(this.getConstructedErrorLabel('api'));
        }
        ["serverUrl", "credentials", "storeId"].forEach(function (configProperty) {
            if (!configuration.api.hasOwnProperty(configProperty) || typeof configuration.api[configProperty] === "undefined") {
                throw new Error(_this.getConstructedErrorLabel(configProperty));
            }
        });
        var credentialProperties = ["clientCode", "apiKey"];
        credentialProperties.forEach(function (credentialsProperty) {
            if (!configuration.api.credentials.hasOwnProperty(credentialsProperty)) {
                throw new Error(_this.getConstructedErrorLabel(credentialsProperty));
            }
        });
        var otherProperties = ['currency', 'platform'];
        otherProperties.forEach(function (configProperty) {
            if (!configuration.hasOwnProperty(configProperty) || typeof configuration[configProperty] === "undefined") {
                throw new Error(_this.getConstructedErrorLabel(configProperty));
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
        return this.configuration.api.serverUrl;
    };
    Configuration.prototype.getApiIdentification = function () {
        return {
            client_code: this.configuration.api.credentials.clientCode,
            api_key: this.configuration.api.credentials.apiKey,
            store_id: this.configuration.api.storeId,
            currency: this.configuration.currency.code,
            api_client: {
                vendor: this.configuration.apiClient.vendor,
                language: this.configuration.apiClient.language,
                version: this.configuration.apiClient.version,
                release: this.configuration.apiClient.release
            }
        };
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
    Configuration.prototype.getPlatformVariable = function (key) {
        if (!this.configuration.platformVariables.hasOwnProperty(key))
            return false;
        return this.configuration.platformVariables[key];
    };
    Configuration.prototype.getStoreId = function () {
        return this.configuration.api.storeId;
    };
    Configuration.prototype.getPlatformVariables = function () {
        return this.configuration.platformVariables;
    };
    Configuration.prototype.getExchangeRate = function () {
        var exchangeRate = 1;
        if (this.configuration.currency.exchangeRate) {
            exchangeRate = this.configuration.currency.exchangeRate;
        }
        return parseFloat(exchangeRate.toString());
    };
    Configuration.prototype.getFractionalDigits = function () {
        var fractionalDigits = 2;
        if (this.configuration.currency.hasOwnProperty("fractionalDigits")) {
            fractionalDigits = this.configuration.currency.fractionalDigits;
        }
        return parseFloat(fractionalDigits.toString());
    };
    Configuration.prototype.getCurrency = function () {
        return this.configuration.currency;
    };
    Configuration.prototype.getClientCode = function () {
        return this.configuration.api.credentials.clientCode;
    };
    Configuration.prototype.getStoreFrontAPIAccessToken = function () {
        return this.configuration.platformVariables.storeFrontAPIAccessToken;
    };
    Configuration.prototype.getMyShopifyDomain = function () {
        return this.configuration.platformVariables.myShopifyDomain;
    };
    Configuration.prototype.isShopify = function () {
        return this.getPlatform() === "shopify";
    };
    Configuration.prototype.isMagento = function () {
        return this.getPlatform() === "magento";
    };
    Configuration.prototype.isBigCommerce = function () {
        return this.getPlatform() === "bigcommerce";
    };
    Configuration.prototype.getCountryCode = function () {
        return this.configuration.countryCode;
    };
    Configuration.prototype.isUsingBaseCountryCode = function () {
        return this.configuration.countryCode === this.configuration.baseCountryCode;
    };
    Configuration.prototype.isUsingMultiCountryCurrency = function () {
        return (this.isShopify() &&
            this.configuration.platformVariables &&
            this.configuration.platformVariables.hasOwnProperty("useStoreFrontAPIForProductPrices") &&
            this.configuration.platformVariables.useStoreFrontAPIForProductPrices === true);
    };
    Configuration.prototype.waitForStoreFrontAPI = function () {
        if (this.isShopify()) {
            if (!this.configuration.platformVariables.hasOwnProperty("waitForStoreFrontAPI")) {
                return true;
            }
            return this.configuration.platformVariables.waitForStoreFrontAPI;
        }
        return false;
    };
    return Configuration;
}());
exports.default = new Configuration();
//# sourceMappingURL=configuration.js.map