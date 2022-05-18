import { objectToFormData } from "../shared/helpers/api";
import AnalyticsTracker, { COOKIES } from "./analyticsTracker";
import api from "./api"
import configuration from "./configuration";
import cookie from "./cookie";
import shopifyResponseFormatter from '../shared/helpers/formatters/shopifyResponseFormatter';

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

  call(requestOptions) {
    this.requestOptions = requestOptions;
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
        response = this.formatResponse(response)
        const analyticsData = this.extractAnalyticsData(response);
        requestOptions.onSuccess(response, analyticsData);
        if (configuration.canTrackAnalytics()) {
          if (response.status === "OK") {
            // Track analytics data if track is enabled
            AnalyticsTracker.trackEvent(analyticsData.event_type, analyticsData.event_details);
          }
        } else {
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
    //TODO:// BRING PlATFORM CONTEXT HERE
    const platform = 'Shopify'
    if(platform === 'Shopify'){
      return shopifyResponseFormatter.getFormattedResponse(response)
    }
    return response
  }

  getRequestOptions() {
    return DEFAULT_REQUEST_OPTIONS
  }
}

export default APIConnector;