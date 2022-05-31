import { objectToFormData } from "../shared/helpers/api";
import formatFactory from "../shared/helpers/formatters/formatFactory";
import AnalyticsTracker, { COOKIES } from "./analyticsTracker";
import api from "./api"
import configuration from "./configuration";
import cookie from "./cookie";

const DEFAULT_REQUEST_OPTIONS = {
  method: "POST",
  path: "",
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

  call(requestOptions) {
    this.requestOptions = requestOptions;
    this.setResponseFormatter()
    const { method, path, params } = {
      ...DEFAULT_REQUEST_OPTIONS,
      ...this.getRequestOptions()
    };
    api.call(method, path, {
      params: this.formatRequestParams({
        ...params,
        identification: configuration.getApiIdentification()
      }),
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

  formatRequestParams(params) {
    return objectToFormData(params)
  }

  onSuccessfulResponse(response){
    const analyticsData = this.extractAnalyticsData(response);
    const formattedResponse = this.formatResponse(response)
    this.requestOptions.onSuccess(formattedResponse, analyticsData);
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
}

export default APIConnector;