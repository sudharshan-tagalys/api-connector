import configuration from "./lib/configuration";
import { DEFAULT_CONFIGURATION } from "./shared/constants";
import SimilarProductsWidget from "./similar-products-widget";
import SmartWidget from "./smart-widget";
import BoughtAlsoBought from "./bought-also-bought"
import ViewedAlsoViewed from "./viewed-also-viewed"
import AddedToCartAlsoAddedToCart from "./added-to-cart-also-added-to-cart"
import SearchSuggestions from "./search-suggestions"
import Search from './search'
import ProductListingPage from "./product-lisiting-page"
import queryStringManager from "./lib/queryStringManager";
import ShopifyAnalyticsTracker from './lib/shopifyAnalyticsTracker'
import PersonalizedRecommendations from "./personalized-recommendations"
import Recommendations from "./recommendations"
import cookie from "./lib/cookie";
import analyticsTracker, { COOKIES } from "./lib/analyticsTracker";

export const APIConnector = {
  ...Search.export(),
  ...SimilarProductsWidget.export(),
  ...SmartWidget.export(),
  ...BoughtAlsoBought.export(),
  ...ViewedAlsoViewed.export(),
  ...AddedToCartAlsoAddedToCart.export(),
  ...PersonalizedRecommendations.export(),
  ...Recommendations.export(),
  ...SearchSuggestions.export(),
  ...ProductListingPage.export(),
  trackEvent: (eventType, details) => analyticsTracker.trackEvent(eventType, details),
  getPlatformVariable: (variableKey) => configuration.getPlatformVariable(variableKey),
  cookie: {
    get: (cname) => cookie.get(cname),
    set: (cname, cvalue, expiryTime) => cookie.set(cname, cvalue, expiryTime),
    delete: (cname) => cookie.delete(cname)
  },
  getPlatformVariables: () => configuration.getPlatformVariables(),
  setQueryStringConfiguration: (config) => queryStringManager.setConfiguration(config),
}

const setConfiguration = (config) => {
  configuration.setConfiguration({
    ...DEFAULT_CONFIGURATION,
    ...config
  })
  if(config.platform.toLowerCase() === 'shopify'){
    const canTrackAnalytics = (config.track && config.analyticsStorageConsentProvided())
    if(canTrackAnalytics){
      const shopifyAnalyticsTracker = new ShopifyAnalyticsTracker()
      shopifyAnalyticsTracker.track()
    }else{
      cookie.batchDelete(Object.values(COOKIES))
    }
  }
}

export {
  setConfiguration,
}

window.addEventListener("load", () => {
  const event = new Event("tagalys:ready")
  document.dispatchEvent(event)
})