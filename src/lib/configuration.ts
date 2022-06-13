import { APIConfiguration } from "../shared/types";

class Configuration{
  private configuration: APIConfiguration;
  setConfiguration(configuration) {
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
    }
  }

  validateConfiguration(configuration) {
    ["serverUrl", "credentials", "storeId", "currencyCode"].forEach((configProperty) => {
      if (!configuration.hasOwnProperty(configProperty) || typeof configuration[configProperty] === "undefined") {
        throw new Error(this.getConstructedErrorLabel(configProperty))
      }
    })
    const credentialProperties = ["clientCode", "apiKey"]
    credentialProperties.forEach((credentialsProperty) => {
      if (!configuration.credentials.hasOwnProperty(credentialsProperty)) {
        throw new Error(this.getConstructedErrorLabel(credentialsProperty))
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
    return this.configuration.serverUrl;
  }

  getApiIdentification() {
    return this.configuration.identification;
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

}
export default new Configuration();