import APIConnector from "../lib/apiConnector"
import configuration from "../lib/configuration"
import { SHOPIFY_PLATFORM } from "../shared/constants"
import { similarProductsResponseFormatter } from "../shared/helpers/formatters/shopifyResponseFormatter"

import { AnalyticsData } from "../shared/types"
import { SimilarProductsWidgetRequestOptions } from "./types"

class SimilarProductsWidget extends APIConnector {
  getRequestOptions() : SimilarProductsWidgetRequestOptions{
    return {
      path: `products/${this.requestOptions.params.productId}/similar`,
      method: "post",
      headers: {
        contentType: "application/x-www-form-urlencoded"
      },
      params: {
        request: ["result", "details"],
        max_products: this.requestOptions.params.limit,
      },
    }
  }

  formatResponse(response){
    if(configuration.getPlatform() === SHOPIFY_PLATFORM){
      return similarProductsResponseFormatter.getFormattedResponse(response)
    }
    return response
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
export default new SimilarProductsWidget();