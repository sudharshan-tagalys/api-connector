import { objectToFormData } from "../utils/api";
import AnalyticsTracker from "./analytics_tracker";
import api from "./api"

class Connector{
  public requestOptions: any;

  call(requestOptions) {
    this.requestOptions = requestOptions;
    api.call(this.method(), this.path(), {
      params: objectToFormData({
        ...requestOptions.params,
        identification: api.getCredentials()
      }),
      onSuccess: (response) => {
        const analyticsData = this.extractAnalyticsData(response);
        requestOptions.onSuccess(response, analyticsData);
        if (requestOptions.track) {
          AnalyticsTracker.trackEvent(analyticsData.event_type, analyticsData.event_details);
        }
      },
      onFailure: (response) => {
        requestOptions.onFailure(response)
      }
    });
  }

  extractAnalyticsData(data) {
    return data
  }

  method() {
    return "post";
  }

  path() {
    return "";
  }
}

export default Connector;