import { APIConfiguration } from "../shared/types";

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
      platformVariables: configuration.platformVariables,
      currency: {
        code: configuration.currency.code
      },
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

  getPlatformVariables() {
    return this.configuration.platformVariables
  }
}
export default new Configuration();