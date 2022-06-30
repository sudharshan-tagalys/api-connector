import { REQUEST_FORMAT } from "../shared/constants";
import { objectToFormData } from "../shared/helpers/api";
import formatFactory from "../shared/helpers/formatters/formatFactory";
import AnalyticsTracker, { COOKIES } from "./analyticsTracker";
import api from "./api"
import configuration from "./configuration";
import cookie from "./cookie";

const DEFAULT_REQUEST_OPTIONS = {
  method: "POST",
  path: "",
  format: REQUEST_FORMAT.FORM_DATA,
  headers: {
    contentType: "application/x-www-form-urlencoded"
  },
  params: {}
}


class APIConnector{
  public requestOptions: any;
  public responseFormatter: any;

  setResponseFormatter(){
    if(!this.responseFormatter){
      this.responseFormatter = formatFactory.responseFormatter()
    }
  }

  call(requestOptions = this.requestOptions) {
    this.requestOptions = requestOptions;
    this.setResponseFormatter()
    let { method, path, params, format } = {
      ...DEFAULT_REQUEST_OPTIONS,
      ...this.getRequestOptions()
    };
    params = this.beforeAPICall(this.requestOptions.params)
    api.call(method, path, {
      params: this.formatRequestParams({
        ...params,
        identification: configuration.getApiIdentification()
      }, format),
      onSuccess: (response) => {
        if (this.isFailureResponse(response)) {
          this.requestOptions.onFailure(response)
        } else {
          this.onSuccessfulResponse(response)
        }
      },
      onFailure: (response) => {
        this.requestOptions.onFailure(response)
      }
    });
  }

  formatRequestParams(params, format) {
    if (format === REQUEST_FORMAT.FORM_DATA) {
      return objectToFormData(params)
    }
    if (format === REQUEST_FORMAT.JSON) {
      return JSON.stringify(params)
    }
    return params
  }

  getHelpersToExpose(type = 'request'){
    return {}
  }

  internalSuccessCallback(response, formattedResponse){

  }

  onSuccessfulResponse(response){
    const analyticsData = this.extractAnalyticsData(response);
    const formattedResponse = this.formatResponse(response)
    this.internalSuccessCallback(response, formattedResponse)
    const responseHelpers = this.getHelpersToExpose('response')
    const analyticsHelpers = {
      getAnalyticsData: () => analyticsData
    }
    this.requestOptions.onSuccess(formattedResponse, {
      ...responseHelpers,
      ...analyticsHelpers
    });
    if (configuration.canTrackAnalytics()) {
      AnalyticsTracker.trackEvent(analyticsData.event_type, analyticsData.event_details);
    }
    if(!configuration.analyticsStorageConsentProvided()){
      cookie.batchDelete(Object.values(COOKIES))
    }
  }

  extractAnalyticsData(response) {
    return response
  }

  formatResponse(response){
    return response
  }

  getRequestOptions() {
    return {}
  }

  isFailureResponse(response): boolean{
    return false
  }

  beforeAPICall(params){
    return this.requestOptions.beforeAPICall(params)
  }

  static defaultRequestOptions(){
    return {}
  }

  new(requestOptions){
    return undefined
  }

  static exporterName(){
    throw new Error("Should specify exporter name")
  }

  static export(){
    let exporterKey:any = this.exporterName()
    return {
      [exporterKey]: {
        call:  (requestOptions, defaultRequestOptions = this.defaultRequestOptions()) => {
          const instance = new this()
          return instance.call({
            ...defaultRequestOptions,
            ...requestOptions
          })
        },
        new: (requestOptions, defaultRequestOptions = this.defaultRequestOptions()) => {
          const instance = new this()
          const helpers = instance.new({
            ...defaultRequestOptions,
            ...requestOptions
          })
          return {
            helpers,
            call: (requestOptions) => instance.call(requestOptions)
          }
        }
      }
    }
  }
}

export default APIConnector;