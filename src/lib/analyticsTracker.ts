import * as Bowser from "bowser"

import { AppContext } from "../utils/common"
import api from "./api"
import cookie from "./cookie"

AppContext.tagalysAnalyticsLastEventTimestamp = false
AppContext.tagalysAnalyticsRapidEventSequence = 0
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

      console.log(this.bowser)
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
    if (AppContext.tagalysAnalyticsLastEventTimestamp  != false) {
      secondsSinceLastEvent = Math.floor((Date.now() - AppContext.tagalysAnalyticsLastEventTimestamp) / 1000);
    } else {
      secondsSinceLastEvent = 999999;
    }
    if (secondsSinceLastEvent < 2) {
      AppContext.tagalysAnalyticsRapidEventSequence += 1;
    } else {
      AppContext.tagalysAnalyticsRapidEventSequence = 0;
    }
    AppContext.tagalysAnalyticsLastEventTimestamp = Date.now();

    const params = {
      ...trackData,
      rapid_event_sequence: AppContext.tagalysAnalyticsRapidEventSequence,
      tracker_version: trackerVersion,
      device_info: this.getDeviceInfo(),
      user: user,
      identification: api.getIdentification()
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
    const device_type = this.bowser.platform.type
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const device_info = {
      device_type: device_type,
      os: {
        name: this.detectOS()
      },
      browser: {
        name: this.bowser.browser.name,
        version: this.bowser.browser.version
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
    for (let i = 0; i < RELEVANT_OS_DETECTS.length; i++) {
      if (this.bowser.os.name.toLowerCase() === RELEVANT_OS_DETECTS[i].toLowerCase()) {
        return RELEVANT_OS_DETECTS[i];
      }
    }
    return 'unknown';
  }
}

export default new AnalyticsTracker();