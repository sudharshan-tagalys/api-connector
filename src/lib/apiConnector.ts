import { objectToFormData } from "../utils/api";
import AnalyticsTracker from "./analyticsTracker";
import api from "./api"

const DEFAULT_REQUEST_OPTIONS = {
  method: "POST",
  path: "",
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
        identification: api.getIdentification()
      }),
      onSuccess: (response) => {
        const analyticsData = this.extractAnalyticsData(response);
        requestOptions.onSuccess(response, analyticsData);
        if (this.canTrackAnalytics()) {
          // Track analytics data if track is enabled
          AnalyticsTracker.trackEvent(analyticsData.event_type, analyticsData.event_details);
        }
      },
      onFailure: (response) => {
        requestOptions.onFailure(response)
      }
    });
  }

  canTrackAnalytics(): boolean {
    const { analytics } = this.requestOptions;
    if (analytics.track === false) {
      return false
    }
    if (analytics.hasConsentManager === false) {
      return true
    }
    if (typeof analytics.hasConsentToTrack === "function") {
      return analytics.hasConsentToTrack()
    }
    return true
  }

  extractAnalyticsData(data) {
    return data
  }

  getRequestOptions() {
    return DEFAULT_REQUEST_OPTIONS
  }
}

export default APIConnector;