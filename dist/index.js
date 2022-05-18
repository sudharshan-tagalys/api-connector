import configuration from "./lib/configuration";
import similarProductsWidget from "./similarProductsWidget";
import smartWidget from "./smartWidget";
export var APIConnector = {
    SimilarProducts: {
        call: function (requestOptions) { return similarProductsWidget.call(requestOptions); },
    },
    SmartWidget: {
        call: function (requestOptions) { return smartWidget.call(requestOptions); },
    },
    setConfiguration: function (config) { return configuration.setConfiguration(config); },
};
