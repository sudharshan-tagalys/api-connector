import Connector from "./lib/connector"

class SimilarProductsWidget extends Connector {
  path() {
    return `products/${this.requestOptions.params.product}/similar`;
  }
  extractAnalyticsData(response) {
    let plDetails = {}
    if (response.hasOwnProperty("sku")) {
      plDetails["sku"] = response.sku
    }
    const productSkus = response["details"].map((product) => product.sku)
    return {
      event_type: "product_list",
      event_details: {
        pl_type: "widget-similar_products",
        pl_details: plDetails,
        pl_products: productSkus,
        pl_total: productSkus.length
      }
    }
  }
}
export default new SimilarProductsWidget();