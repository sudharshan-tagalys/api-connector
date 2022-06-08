import APIConnector from "../lib/apiConnector"
import { AnalyticsData } from "../shared/types"
import { WidgetRequestOptions } from "../shared/types"

class BoughtAlsoBought extends APIConnector {
  getRequestOptions() : WidgetRequestOptions{
    return {
      path: `products/${this.requestOptions.params.productId}/bought_also_bought`,
      params: {
        request: ["result", "details"],
        max_products: this.requestOptions.params.limit || 16,
      },
    }
  }

  exporterName(){
    return 'BoughtAlsoBought'
  }

  formatResponse(response){
    return this.responseFormatter.boughtAlsoBought(response)
  }

  extractAnalyticsData(response) : AnalyticsData {
    let plDetails: any = {}
    if (response.hasOwnProperty("sku")) {
      plDetails["product"] = response.sku
    }
    const productSkus = response["details"].map((product) => product.sku)
    return {
      event_type: "product_list",
      event_details: {
        pl_type: "widget-bought_also_bought",
        pl_details: plDetails,
        pl_products: productSkus,
        pl_total: productSkus.length
      }
    }
  }
}

export default new BoughtAlsoBought();