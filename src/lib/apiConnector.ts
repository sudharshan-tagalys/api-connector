import { objectToFormData } from "../shared/helpers/api";
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

  getRequestOptions() {
    return DEFAULT_REQUEST_OPTIONS
  }
}

export default APIConnector;