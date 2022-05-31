import configuration from "./lib/configuration";
import { DEFAULT_CONFIGURATION, DEFAULT_REQUEST_OPTIONS } from "./shared/constants";
import similarProductsWidget from "./similarProductsWidget";
import smartWidget from "./smartWidget";
import searchSuggestions from "./searchSuggestions"


const withDefaultRequestOptions = (requestOptions, defaultRequestOptions = DEFAULT_REQUEST_OPTIONS) => {
  return {
    ...defaultRequestOptions,
    ...requestOptions
  }
}

export const APIConnector = {
  SimilarProducts: {
    call: (requestOptions) => similarProductsWidget.call(withDefaultRequestOptions(requestOptions)),
  },
  SmartWidget: {
    call: (requestOptions) => smartWidget.call(withDefaultRequestOptions(requestOptions)),
  },
  SearchSuggestions: {
    call: (requestOptions) => searchSuggestions.instance.call(withDefaultRequestOptions(requestOptions, searchSuggestions.defaultRequestOptions)),
    new: (requestOptions) => searchSuggestions.instance.new(withDefaultRequestOptions(requestOptions, searchSuggestions.defaultRequestOptions))
  },
  setConfiguration: (config) => configuration.setConfiguration({
    ...DEFAULT_CONFIGURATION,
    ...config
  }),
}

window.addEventListener("load", () => {
  const event = new Event("tagalys:ready")
  document.dispatchEvent(event)
})