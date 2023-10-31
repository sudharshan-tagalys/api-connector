import { DEFAULT_REQUEST_CALLBACKS, REQUEST_FORMAT } from "../shared/constants";
import { objectToFormData } from "../shared/helpers/api";
import formatFactory from "../shared/helpers/formatters/formatFactory";
import AnalyticsTracker, { TAGALYS_ANALYTICS_COOKIES } from "./analyticsTracker";
import configuration from "./configuration";
import cookie from "./cookie";
import PlatformHelpers from '../shared/platform-helpers'
import TagalysAPI from "./api/tagalysApi";
import shopifyConfiguration from "./shopifyConfiguration";
import failover from "./failover";

type HealthDetails = {
  path: string;
  body?: string;
  headers?: { contentType?: string }
};


const DEFAULT_REQUEST_OPTIONS = {
  method: "POST",
  path: "",
  format: REQUEST_FORMAT.FORM_DATA,
  headers: {
    contentType: "application/x-www-form-urlencoded"
  },
  params: {}
}

class APIConnector {
  public requestOptions: any;
  public currentRequestNumber: any = 0;
  public completedRequestNumber: any = 0;
  public responseFormatter: any;

  setResponseFormatter() {
    if (!this.responseFormatter) {
      this.responseFormatter = formatFactory.responseFormatter()
    }
  }

  apiClient() : any {
    return new TagalysAPI()
  }

  async call(requestOptions = this.requestOptions) {
    const currentRequest = this.currentRequestNumber += 1;
    this.updateRequestNumber(currentRequest)

    this.requestOptions = requestOptions;
    this.setResponseFormatter()
    let { method, path, params, format } = {
      ...DEFAULT_REQUEST_OPTIONS,
      ...this.getRequestOptions()
    };
    params = this.beforeAPICall(params)

    this.apiClient().call(method, path, {
      params: this.formatRequestParams({
        ...params,
        identification: configuration.getApiIdentification()
      }, format),
      onSuccess: (response) => {
        if (this.oldRequest(currentRequest)) {
          return
        }
        this.markRequestComplete(currentRequest)
        if (this.isFailureResponse(response)) {
          this.requestOptions.onFailure(response, this.getHelpersToExpose(false, false))
        } else {
          this.onSuccessfulResponse(response)
        }
      },
      onFailure: (response) => {
        console.log("falied")
        if (this.oldRequest(currentRequest)) {
          return
        }
        this.markRequestComplete(currentRequest)
        this.requestOptions.onFailure(response, this.getHelpersToExpose(false, false))
      },
      health: this.getHealthCheckDetails()
    });
  }

  getHealthCheckDetails(): boolean | HealthDetails {
    return false
  }

  formatRequestParams(params, format) {
    if (format === REQUEST_FORMAT.GRAPHQL) {
      return JSON.stringify(params)
    }
    if (format === REQUEST_FORMAT.FORM_DATA) {
      return objectToFormData(params)
    }
    if (format === REQUEST_FORMAT.JSON) {
      return JSON.stringify(params)
    }
    return params
  }

  getHelpersToExpose(response, formattedResponse): any {
    return {
      updateProductDetailsForMarket: async (response)=>{
        const MultiMarket = PlatformHelpers.MultiMarket.new()
        await MultiMarket.updateProductDetailsForMarket(response)
      }
    }
  }

  internalSuccessCallback(response, formattedResponse) {

  }

  getFormattedResponse(response) {
    return this.formatResponse(response)
  }

  async onSuccessfulResponse(response) {
    const analyticsData = this.extractAnalyticsData(response);
    const formattedResponse = this.formatResponse(response)
    const mutatedResponse = await this.mutateResponse(formattedResponse)
    this.internalSuccessCallback(response, mutatedResponse)
    const helpers = this.getHelpersToExpose(response, mutatedResponse)
    this.requestOptions.onSuccess(mutatedResponse, helpers);
    if (analyticsData && configuration.canTrackAnalytics()) {
      AnalyticsTracker.trackEvent(analyticsData.event_type, analyticsData.event_details);
    }
    if (!configuration.analyticsStorageConsentProvided()) {
      cookie.batchDelete(TAGALYS_ANALYTICS_COOKIES)
    }
  }

  async mutateResponse(formattedResponse) {
    if(configuration.isShopify()){
      if (!configuration.isUsingBaseCountryCode() && shopifyConfiguration.useStorefrontAPIForSecondaryMarkets()) {
        const MultiMarket = PlatformHelpers.MultiMarket.new()
        if(shopifyConfiguration.canWaitForStorefrontAPI()){
          await MultiMarket.updateProductDetailsForMarket(formattedResponse)
        }else{
          await MultiMarket.resetProductPrices(formattedResponse)
        }
      }
    }
    return formattedResponse
  }

  extractAnalyticsData(response) {
    return response
  }

  formatResponse(response) {
    return response
  }

  getRequestOptions() {
    return {}
  }

  isFailureResponse(response): boolean {
    return false
  }

  beforeAPICall(params) {
    return this.requestOptions.beforeAPICall(params)
  }

  static defaultRequestOptions() {
    return {
      ...DEFAULT_REQUEST_CALLBACKS
    }
  }

  new(requestOptions) {
    return undefined
  }

  static exporterName() {
    throw new Error("Should specify exporter name")
  }

  updateRequestNumber(requestNumber) {
    this.currentRequestNumber = requestNumber
    return requestNumber
  }

  markRequestComplete(requestNumber) {
    this.completedRequestNumber = requestNumber
    return requestNumber
  }

  oldRequest(requestNumber) {
    return (requestNumber < this.completedRequestNumber)
  }

  static export() {
    let exporterKey: any = this.exporterName()
    return {
      [exporterKey]: {
        call: (requestOptions, defaultRequestOptions = this.defaultRequestOptions()) => {
          const instance = new this()
          return instance.call({
            ...defaultRequestOptions,
            ...requestOptions
          })
        },
        new: (requestOptions: any = {}, defaultRequestOptions = this.defaultRequestOptions()) => {
          const failoverProvided = requestOptions.hasOwnProperty('failover')
          if(failoverProvided && requestOptions.forceFailover){
            return requestOptions.failover()
          }

          const instance = new this()
          const isTagalysOfflineAndHasFailover = (TagalysAPI.isOffline() && failoverProvided)
          if (isTagalysOfflineAndHasFailover) {
            failover.pollUntilAPIisHealthy(instance.getHealthCheckDetails())
            return requestOptions.failover()
          }

          const helpers = instance.new({
            ...defaultRequestOptions,
            ...requestOptions
          })
          return {
            helpers: {
              ...helpers,
              call: () => instance.call(instance.requestOptions)
            }
          }
        }
      }
    }
  }
}

export default APIConnector;