import Connector from "./lib/connector"

class SimilarProductsWidget extends Connector {
  path() {
    return `/products/${this.requestOptions.params.product}/similar`;
  }
  extractAnalyticsData(data) {
    return data["results"]
  }
}
export default new SimilarProductsWidget();