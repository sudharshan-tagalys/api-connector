import analyticsTracker, { COOKIES } from './analyticsTracker'
import cookie from "./cookie"

class ShopifyAnalyticsTracker {
  window(){
    const _window: any = window
    return _window
  }

  getShopifyObject(){
    if (typeof (this.window().Shopify) != 'undefined') {
      return this.window().Shopify
    }
    return false
  }

  getPageMetaData(){
    const meta : any = this.window().meta
    if (typeof meta !== "undefined") {
      if (typeof meta["page"] !== "undefined") {
        return meta
      }
    }
    return false
  }

  logTrack(event, data){
    console.log("TRACKING event: " + event, data)
  }

  trackProductIfExist(){
    if(this.getPageMetaData()){
      const metaData = this.getPageMetaData()
      if(metaData.page.pageType == 'product'){
        const dataToTrack = {
          sku: (metaData.page.resourceId + ''),
          action: 'view'
        }
        this.logTrack("product_action", dataToTrack)
        analyticsTracker.trackEvent('product_action', dataToTrack)
      }
    }
  }

  trackCollectionIfExist(){
    if(this.getPageMetaData()){
      const metaData = this.getPageMetaData()
      if(metaData.page.pageType == 'collection'){
        const dataToTrack = {
          pl_type: 'page-platform',
          pl_details: { page_id: metaData.page.resourceId }
        }
        this.logTrack("product_list", dataToTrack)
        analyticsTracker.trackEvent('product_list', dataToTrack)
      }
    }
  }

  trackCartTokenIfExist(){
    const cartToken = cookie.get(COOKIES.CART);
    if (cartToken == '') {
      cookie.delete(COOKIES.TA_CART);
    } else {
      // cart token exists
      var trackedCartToken = cookie.get(COOKIES.TA_CART);
      if (trackedCartToken != cartToken) {
        // not tracked
        const dataToTrack = { cart_token: cartToken }
        this.logTrack("analytics/cart_token/track", dataToTrack)
        analyticsTracker.trackEvent('analytics/cart_token/track', dataToTrack);
        cookie.set(COOKIES.TA_CART, cartToken, 8640000);
      }
    }
  }

  track(){
    this.trackProductIfExist()
    this.trackCollectionIfExist()
    this.trackCartTokenIfExist()
  }
}

export default ShopifyAnalyticsTracker;
