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
      apiServer: configuration.apiServer,
      track: configuration.track,
      trackingConsentProvided: configuration.trackingConsentProvided,
    }
  }

  getConfiguration() {
    return this.configuration;
  }

  getApiServer() {
    return this.configuration.apiServer;
  }

  getApiIdentification() {
    console.log(this.configuration)
    return this.configuration.identification;
  }

  canTrackAnalytics() {
    return (this.configuration.track && this.configuration.trackingConsentProvided())
  }

}
export default new Configuration();