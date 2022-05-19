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
      params: objectToFormData({
        ...params,
        identification: configuration.getApiIdentification()
      }),
      onSuccess: (response) => {
        const analyticsData = this.extractAnalyticsData(response);
        response = this.formatResponse(response)
        requestOptions.onSuccess(response, analyticsData);
        if (configuration.canTrackAnalytics()) {
          if (response.status === "OK") {
            // Track analytics data if track is enabled
            AnalyticsTracker.trackEvent(analyticsData.event_type, analyticsData.event_details);
          }
        }
      if(!configuration.analyticsStorageConsentProvided()){
          cookie.batchDelete(Object.values(COOKIES))
        }
      },
      onFailure: (response) => {
        requestOptions.onFailure(response)
      }
    });
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
}

export default APIConnector;