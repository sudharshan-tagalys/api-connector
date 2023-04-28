const PRODUCT_VIEW = "product_view"
const ADD_TO_CART = "add_to_cart"
const BUY = "buy"
const PRODUCT_LISTING_PAGE_VIEW = "product_listing_page_view"
const USER_LOGIN = "user_login"

export const DEFAULT_EVENT_TYPES = [
  PRODUCT_VIEW,
  ADD_TO_CART,
  BUY,
  PRODUCT_LISTING_PAGE_VIEW,
  USER_LOGIN
]

class PlatformAnalyticsTracker{
  public eventTypes;
  constructor(eventTypes){
    this.eventTypes = eventTypes
  }

  canTrackProductView(){
    return this.eventTypes.includes(PRODUCT_VIEW)
  }

  canTrackAddToCart(){
    return this.eventTypes.includes(ADD_TO_CART)
  }

  canTrackBuy(){
    return this.eventTypes.includes(BUY)
  }

  canTrackListingPageView(){
    return this.eventTypes.includes(PRODUCT_LISTING_PAGE_VIEW)
  }

  canTrackUserLogin(){
    return this.eventTypes.includes(USER_LOGIN)
  }

  track() {
    
  }
}
export default PlatformAnalyticsTracker