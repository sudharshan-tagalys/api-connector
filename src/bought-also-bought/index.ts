import APIConnector from "../lib/apiConnector"
import { AnalyticsData } from "../shared/types"
import { SimilarProductsWidgetRequestOptions } from "./types"

class BoughtAlsoBought extends APIConnector {
  getRequestOptions() : SimilarProductsWidgetRequestOptions{
    return {
      path: `products/${this.requestOptions.params.productId}/similar`,
      params: {
        request: ["result", "details"],
        max_products: this.requestOptions.params.limit || 16,
      },
    }
  }

  exporterName(){
    return 'SimilarProducts'
  }

  formatResponse(response){
    return this.responseFormatter.similarProducts(response)
  }

  isFailureResponse(response) {
    return response.status != "OK"
  }

  extractAnalyticsData(response) : AnalyticsData {
    let plDetails: any = {}
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

export default new BoughtAlsoBought();