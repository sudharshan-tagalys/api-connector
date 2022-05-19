import { APIConfiguration } from "../shared/types";

class Configuration{
  private configuration: APIConfiguration;
  setConfiguration(configuration) {
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
    }
  }

  getConfiguration() {
    return this.configuration;
  }

  getApiServer() {
    return this.configuration.apiServer;
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