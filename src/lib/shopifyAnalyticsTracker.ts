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

  getCheckoutObject(){
    if(this.getShopifyObject()){
      const shopifyObject = this.getShopifyObject()
      if(shopifyObject.checkout){
        return shopifyObject.checkout
      }
      return false
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
        analyticsTracker.track('analytics/cart_token/track', dataToTrack);
        cookie.set(COOKIES.TA_CART, cartToken, 8640000);
      }
    }
  }

  trackOrderIfExist(){
    debugger
    if (this.getCheckoutObject()) {
      const checkout = this.getCheckoutObject()
      var checkoutTime: any = new Date(checkout.created_at);
      const currentDateTime: any = new Date()
      var hoursSinceOrderCreation = (currentDateTime - checkoutTime) / 3600000;
      if (hoursSinceOrderCreation < (24 * 30)) {
        // checkout started within last 30 days
        var lastTrackedOrderId = cookie.get(COOKIES.TA_LAST_ORDER_ID);
        var orderId = (checkout.order_id + '');
        if (lastTrackedOrderId != orderId) {
          cookie.set(COOKIES.TA_LAST_ORDER_ID, orderId, 24 * 60 * 60 * 1000);
          for (var i = 0; i < checkout.line_items.length; i++) {
            var thisOrderEventData = {
              action: 'buy',
              sku: (checkout.line_items[i].product_id + ''),
              quantity: checkout.line_items[i].quantity,
              order_id: orderId
            }
            this.logTrack("product_action", thisOrderEventData)
            analyticsTracker.trackEvent('product_action', thisOrderEventData);
          }
        }
      }
    }
  }

  track(){
    this.trackProductIfExist()
    this.trackCollectionIfExist()
    this.trackCartTokenIfExist()
    this.trackOrderIfExist()
  }
}

export default ShopifyAnalyticsTracker;
