import api from "./api"
import configuration from "./configuration"
import cookie from "./cookie"

export const COOKIES = {
  TA_DEVICE: "__ta_device",
  TA_VISIT: "__ta_visit",
  TA_USER_ID: "__ta_user_id",
  TA_LAST_PA_TIME : "__ta_last_pa_time",
  TA_CART: '__ta_cart',
  CART: 'cart',
  TA_LAST_ORDER_ID: '__ta_last_order_id'
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
      event_type: eventType,
      details: details
    })
  }
  track(endpoint, trackData, trackerVersion = TRACKER_VERSION) {
    if (configuration.canTrackAnalytics()) {
      if (cookie.isEnabled()) {
        cookie.batchUpdate([{
          name: COOKIES.TA_DEVICE,
          expiryTime: 63072000000
        },{
          name: COOKIES.TA_VISIT,
          expiryTime: 1800000
        }])

        let user = {
          device_id: cookie.get(COOKIES.TA_DEVICE),
          visit_id: cookie.get(COOKIES.TA_VISIT)
        }

        if (cookie.get(COOKIES.TA_USER_ID)) {
          // add user_id to user object for analytics tracking
        }

        this.analyticsRapidEventSequence = this.getAnalyticsRapidEventSequence()
        this.lastEventTimestamp = Date.now();

        const params = {
          ...trackData,
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
            if (trackData.event_type && trackData.event_type == 'product_action' && response.hasOwnProperty('timestamp')) {
              const lastProductActionTime = response.timestamp.split('T')[1].substring(0,6)
              cookie.set(COOKIES.TA_LAST_PA_TIME, lastProductActionTime, 1200000);
            }
          }
        })
      }
    } else {
      cookie.batchDelete(Object.values(COOKIES))
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