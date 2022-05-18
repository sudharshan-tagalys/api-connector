import configuration from "./lib/configuration";
import similarProductsWidget from "./similarProductsWidget";
import smartWidget from "./smartWidget";

export const APIConnector = {
  SimilarProducts: {
    call: (requestOptions) => similarProductsWidget.call(requestOptions),
  },
  SmartWidget: {
    call: (requestOptions) => smartWidget.call(requestOptions),
  },
  setConfiguration: (config) => configuration.setConfiguration(config),
}