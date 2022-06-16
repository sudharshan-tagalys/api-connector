import configuration from "./lib/configuration";
import { DEFAULT_CONFIGURATION, DEFAULT_REQUEST_OPTIONS } from "./shared/constants";
import similarProductsWidget from "./similar-products-widget";
import smartWidget from "./smart-widget";
import boughtAlsoBought from "./bought-also-bought"
import viewedAlsoViewed from "./viewed-also-viewed"
import addedToCartAlsoAddedToCart from "./added-to-cart-also-added-to-cart"
import searchSuggestions from "./search-suggestions"
import queryStringManager from "./lib/queryStringManager";

export const APIConnector = {
  ...similarProductsWidget.export(),
  ...smartWidget.export(),
  ...boughtAlsoBought.export(),
  ...viewedAlsoViewed.export(),
  ...addedToCartAlsoAddedToCart.export(),
  ...searchSuggestions.export(),
  setConfiguration: (config) => configuration.setConfiguration({
    ...DEFAULT_CONFIGURATION,
    ...config
  }),
  queryString: {
    setConfiguration: (config) => queryStringManager.setConfiguration(config)
  }
}

window.addEventListener("load", () => {
  const event = new Event("tagalys:ready")
  document.dispatchEvent(event)
})