import * as Bowser from "bowser"

import api from "./api"
import cookie from "./cookie"

var tagalysAnalyticsLastEventTimestamp: any = false
var tagalysAnalyticsRapidEventSequence: any = 0
class AnalyticsTracker{
  private bowser: any;
  trackEvent(event_type, details) {
    this.track("analytics/events/track", {
      event_type,
      details
    })
  }
  track(endpoint, trackData, trackerVersion = 3) {
    if (cookie.isEnabled()) {
      this.bowser = Bowser.getParser(window.navigator.userAgent)
      this.bowser = this.bowser.parsedResult
      cookie.batchUpdate([{
        name: "__ta_device",
        expiryTime: 63072000000
      },{
        name: "__ta_visit",
        expiryTime: 1800000
      }])
    }

    const user = {
      device_id: cookie.get('__ta_device'),
      visit_id: cookie.get('__ta_visit')
    }

    let secondsSinceLastEvent;
    if (tagalysAnalyticsLastEventTimestamp  != false) {
      secondsSinceLastEvent = Math.floor((Date.now() - tagalysAnalyticsLastEventTimestamp) / 1000);
    } else {
      secondsSinceLastEvent = 999999;
    }
    if (secondsSinceLastEvent < 2) {
      tagalysAnalyticsRapidEventSequence += 1;
    } else {
      tagalysAnalyticsRapidEventSequence = 0;
    }
    tagalysAnalyticsLastEventTimestamp = Date.now();

    const params = {
      ...trackData,
      rapid_event_sequence: tagalysAnalyticsRapidEventSequence,
      tracker_version: trackerVersion,
      device_info: this.getDeviceInfo(),
      user: user,
      identification: api.getCredentials()
    }
    api.call('POST', endpoint, {
      params: JSON.stringify(params),
      onSuccess: function (response) {
        cookie.delete("tagalys-track-async")
        if (trackData.hasOwnProperty('event_type')) {
          if (trackData.event_type == 'product_action' && response.hasOwnProperty('timestamp')) {
            cookie.set('__ta_last_pa_time', response.timestamp.split('T')[1].substring(0,6), 1200000);
          }
        }
      }
    })
  }

  getDeviceInfo() {
    let device_type = 'desktop';
    if (this.bowser.mobile) {
      device_type = 'mobile';
    } else if (this.bowser.tablet) {
      device_type = 'tablet';
    }
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const device_info = {
      device_type: device_type,
      os: {
        name: this.detectOS()
      },
      browser: {
        name: this.bowser.name,
        version: this.bowser.version
      },
      screen_resolution: {
        width: parseInt(`${innerWidth}`),
        height: parseInt(`${innerHeight}`)
      }
    };
    return device_info;
  }

  detectOS() {
    const RELEVANT_OS_DETECTS = [
      'windows',
      'android',
      'ios',
      'mac',
      'linux',
      'chromeos',
      'windowsphone'
    ]
    for(let i = 0; i < RELEVANT_OS_DETECTS.length; i++) {
      if (this.bowser[RELEVANT_OS_DETECTS[i]]) {
        return RELEVANT_OS_DETECTS[i];
      }
    }
    return 'unknown';
  }
}

export default new AnalyticsTracker();