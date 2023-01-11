import analyticsTracker, { COOKIES } from './analyticsTracker'
import cookie from "./cookie"
import PlatformAnalyticsTracker from "./platformAnalyticsTracker"

class MagentoAnalyticsTracker extends PlatformAnalyticsTracker{
  trackUser() {
    const loggedInUserId = cookie.get("__ta_logged_in")
    if(loggedInUserId !== ""){
      cookie.set(COOKIES.TA_USER_ID, loggedInUserId, 3600 * 1000 * 24 * 365 * 10)
      analyticsTracker.track("analytics/users/track", {
        user_id: loggedInUserId
      })
      cookie.delete("__ta_logged_in")
    }
  }

  track() {
    this.trackUser()
  }
}

export default MagentoAnalyticsTracker;
