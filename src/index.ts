import configuration from "./lib/configuration";
import { DEFAULT_CONFIGURATION } from "./shared/constants";
import SimilarProductsWidget from "./similar-products-widget";
import SmartWidget from "./smart-widget";
import BoughtAlsoBought from "./bought-also-bought"
import ViewedAlsoViewed from "./viewed-also-viewed"
import AddedToCartAlsoAddedToCart from "./added-to-cart-also-added-to-cart"
import SearchSuggestions from "./search-suggestions"
import LegacySearchSuggestions from "./search-suggestions/legacy"
import Search from './search'
import ProductListingPage from "./product-lisiting-page"
import queryStringManager from "./lib/queryStringManager";
import PersonalizedRecommendations from "./personalized-recommendations"
import Recommendations from "./recommendations"
import cookie from "./lib/cookie";
import analyticsTracker, { COOKIES, TAGALYS_ANALYTICS_COOKIES } from "./lib/analyticsTracker";
import packageDetails from "./packageDetails";
import platformAnalyticsFactory from "./lib/platformAnalyticsFactory"
import { DEFAULT_EVENT_TYPES } from "./lib/platformAnalyticsTracker";
import formatFactory from "./shared/helpers/formatters/formatFactory";

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
  ...LegacySearchSuggestions.export(),
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
  isUsingMultiCountryCurrency: () => configuration.isUsingMultiCountryCurrency()
}

const setConfiguration = (config) => {
  configuration.setConfiguration({
    ...DEFAULT_CONFIGURATION,
    ...config
  })
}

const Analytics = {
  trackPlatformEvents: (eventTypesToTrack = DEFAULT_EVENT_TYPES) => {
    if (configuration.canTrackAnalytics()) {
      platformAnalyticsFactory.tracker(eventTypesToTrack).track()
    }else{
      cookie.batchDelete(TAGALYS_ANALYTICS_COOKIES)
    }
  },
  trackProductView: (identifier) => {
    const eventDetails = {
      sku: identifier,
      action: 'view'
    }
    analyticsTracker.trackEvent('product_action', eventDetails)
  },
  trackAddToCart: (identifier, quantity) => {
    const eventDetails = {
      sku: identifier,
      action: 'add_to_cart',
      quantity: quantity
    }
    analyticsTracker.trackEvent('product_action', eventDetails)
  },
  trackOrder: (orderId, lineItems) => {
    lineItems.forEach((lineItem)=>{
      const thisOrderEventData = {
        action: 'buy',
        sku: lineItem.identifier,
        quantity: lineItem.quantity,
        order_id: orderId
      }
      analyticsTracker.trackEvent('product_action', thisOrderEventData);
    })
  },
  trackProductListingPageView: (identifier) => {
    const dataToTrack = {
      pl_type: 'page-platform',
      pl_details: { page_id: identifier }
    }
    analyticsTracker.trackEvent('product_list', dataToTrack)
  }
}

const getResponseFormatter = () => {
  return formatFactory.responseFormatter()
}

export {
  Analytics,
  setConfiguration,
  packageDetails,
  getResponseFormatter
}