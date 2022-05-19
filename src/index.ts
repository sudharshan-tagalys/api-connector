import configuration from "./lib/configuration";
import { DEFAULT_CONFIGURATION, DEFAULT_REQUEST_OPTIONS } from "./shared/constants";
import similarProductsWidget from "./similarProductsWidget";
import smartWidget from "./smartWidget";


const withDefaultRequestOptions = (requestOptions) => {
  return {
    ...DEFAULT_REQUEST_OPTIONS,
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
  setConfiguration: (config) => configuration.setConfiguration({
    ...DEFAULT_CONFIGURATION,
    ...config
  }),
}

window.addEventListener("load", () => {
  const event = new Event("tagalys:ready")
  document.dispatchEvent(event)
})