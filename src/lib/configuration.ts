class Configuration{
  private configuration;
  setConfiguration(configuration) {
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
      onFailover: configuration.onFailover,
      apiClient: configuration.apiClient,
      track: configuration.track,
      analyticsStorageConsentProvided: configuration.analyticsStorageConsentProvided
    }
  }

  validateConfiguration(configuration) {
    if(!configuration.hasOwnProperty('api')){
      throw new Error(this.getConstructedErrorLabel('api'))
    }
    ["serverUrl", "credentials", "storeId"].forEach((configProperty) => {
      if (!configuration.api.hasOwnProperty(configProperty) || typeof configuration.api[configProperty] === "undefined") {
        throw new Error(this.getConstructedErrorLabel(configProperty))
      }
    })
    const credentialProperties = ["clientCode", "apiKey"]
    credentialProperties.forEach((credentialsProperty) => {
      if (!configuration.api.credentials.hasOwnProperty(credentialsProperty)) {
        throw new Error(this.getConstructedErrorLabel(credentialsProperty))
      }
    })

    const otherProperties = ['currency', 'platform']
    otherProperties.forEach((configProperty) => {
      if (!configuration.hasOwnProperty(configProperty) || typeof configuration[configProperty] === "undefined") {
        throw new Error(this.getConstructedErrorLabel(configProperty))
      }
    })
  }

  getConstructedErrorLabel(missingConfiguration): string {
    return `${missingConfiguration} configuration is missing. Refer docs.`
  }

  getConfiguration() {
    return this.configuration;
  }

  getServerUrl() {
    return this.configuration.api.serverUrl;
  }

  getApiIdentification() {
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
    }
  }

  getPlatform() {
    return this.configuration.platform.toLowerCase();
  }

  analyticsStorageConsentProvided() {
    return this.configuration.analyticsStorageConsentProvided()
  }

  canTrackAnalytics() {
    return (this.configuration.track && this.configuration.analyticsStorageConsentProvided())
  }

  getPlatformVariable(key) {
    if (!this.configuration.platformVariables.hasOwnProperty(key)) return false
    return this.configuration.platformVariables[key]
  }

  getStoreId() {
    return this.configuration.api.storeId
  }

  getPlatformVariables() {
    return this.configuration.platformVariables
  }

  getExchangeRate() {
    let exchangeRate = 1
    if (this.configuration.currency.exchangeRate) {
      exchangeRate = this.configuration.currency.exchangeRate
    }
    return parseFloat(exchangeRate.toString());
  }

  getFractionalDigits() {
    let fractionalDigits = 2
    if (this.configuration.currency.hasOwnProperty("fractionalDigits")) {
      fractionalDigits = this.configuration.currency.fractionalDigits
    }
    return parseFloat(fractionalDigits.toString());
  }

  getCurrency() {
    return this.configuration.currency;
  }

  getClientCode() {
    return this.configuration.api.credentials.clientCode
  }

  isShopify() {
    return this.getPlatform() === "shopify"
  }

  isMagento() {
    return this.getPlatform() === "magento"
  }

  isBigCommerce() {
    return this.getPlatform() === "bigcommerce"
  }

  getCountryCode(){
    return this.configuration.countryCode
  }

  isUsingBaseCountryCode() {
    return this.configuration.countryCode === this.configuration.baseCountryCode
  }

  onFailover(){
    return this.configuration.onFailover
  }

  get(){
    return this.configuration
  }
}
export default new Configuration();