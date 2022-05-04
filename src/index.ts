import api from "./lib/api";
import similarProductsWidget from "./similarProductsWidget";

export const APIConnector = {
  SimilarProducts: {
    call: (requestOptions) => similarProductsWidget.call(requestOptions),
  },
  setConfiguration: (configuration) => api.setConfiguration(configuration),
  getCurrency: () => api.getCurrency(),
}