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
import analyticsTracker, { COOKIES } from "./lib/analyticsTracker";
import packageDetails from "./packageDetails";
import platformAnalyticsFactory from "./lib/platformAnalyticsFactory"
import { DEFAULT_EVENT_TYPES } from "./lib/platformAnalyticsTracker";

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
  trackNonTagalysAPIEvents: (eventTypesToTrack = DEFAULT_EVENT_TYPES) => {
    if (configuration.canTrackAnalytics()) {
      platformAnalyticsFactory.tracker(eventTypesToTrack).track()
    }else{
      cookie.batchDelete(Object.values(COOKIES))
    }
  }
}

export {
  Analytics,
  setConfiguration,
  packageDetails,
}