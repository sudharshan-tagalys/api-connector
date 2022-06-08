import configuration from "./lib/configuration";
import { DEFAULT_CONFIGURATION, DEFAULT_REQUEST_OPTIONS } from "./shared/constants";
import similarProductsWidget from "./similar-products-widget";
import smartWidget from "./smart-widget";
import searchSuggestions from "./search-suggestions"
import boughtAlsoBought from "./bought-also-bought"
import viewedAlsoViewed from "./viewed-also-viewed"

export const APIConnector = {
  ...similarProductsWidget.export(),
  ...smartWidget.export(),
  ...searchSuggestions.export(),
  ...boughtAlsoBought.export(),
  ...viewedAlsoViewed.export(),
  setConfiguration: (config) => configuration.setConfiguration({
    ...DEFAULT_CONFIGURATION,
    ...config
  }),
}

window.addEventListener("load", () => {
  const event = new Event("tagalys:ready")
  document.dispatchEvent(event)
})