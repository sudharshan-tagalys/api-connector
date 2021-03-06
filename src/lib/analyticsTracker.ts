import api from "./api"
import configuration from "./configuration"
import cookie from "./cookie"

export const COOKIES = {
  TA_DEVICE: "__ta_device",
  TA_VISIT: "__ta_visit",
  TA_LAST_PA_TIME : "__ta_last_pa_time"
}

const TRACKER_VERSION = 3

class AnalyticsTracker{
  private lastEventTimestamp: any
  private analyticsRapidEventSequence: any

  constructor() {
    this.lastEventTimestamp = false
    this.analyticsRapidEventSequence = 0
  }

  trackEvent(eventType, details) {
    this.track("analytics/events/track", {
      eventType,
      details
    })
  }
  track(endpoint, { eventType, details }, trackerVersion = TRACKER_VERSION) {
    if (cookie.isEnabled()) {
      cookie.batchUpdate([{
        name: COOKIES.TA_DEVICE,
        expiryTime: 63072000000
      },{
        name: COOKIES.TA_VISIT,
        expiryTime: 1800000
      }])

      const user = {
        device_id: cookie.get(COOKIES.TA_DEVICE),
        visit_id: cookie.get(COOKIES.TA_VISIT)
      }

      this.analyticsRapidEventSequence = this.getAnalyticsRapidEventSequence()
      this.lastEventTimestamp = Date.now();

      const params = {
        event_type: eventType,
        details: details,
        rapid_event_sequence: this.analyticsRapidEventSequence,
        tracker_version: trackerVersion,
        device_info: {},
        identification: {
          ...configuration.getApiIdentification(),
          user
        }
      }
      api.call('POST', endpoint, {
        params: JSON.stringify(params),
        onSuccess: function (response) {
          if (eventType && eventType == 'product_action' && response.hasOwnProperty('timestamp')) {
            const lastProductActionTime = response.timestamp.split('T')[1].substring(0,6)
            cookie.set(COOKIES.TA_LAST_PA_TIME, lastProductActionTime, 1200000);
          }
        }
      })
    }
  }

  getAnalyticsRapidEventSequence() {
    let secondsSinceLastEvent = 999999;
    let analyticsRapidEventSequence = this.analyticsRapidEventSequence
    if (this.lastEventTimestamp  != false) {
      secondsSinceLastEvent = Math.floor((Date.now() - this.lastEventTimestamp) / 1000);
    }
    if (secondsSinceLastEvent < 2) {
      analyticsRapidEventSequence += 1;
    } else {
      analyticsRapidEventSequence = 0;
    }
    return analyticsRapidEventSequence
  }
}

export default new AnalyticsTracker();