import APIConnector from "../lib/apiConnector"
import { WidgetParams } from "../shared/types"
import { WidgetRequestOptions } from "../shared/types"

class Widget extends APIConnector {

  getRequestOptions(): WidgetRequestOptions {
    return {
      path: this.path(),
      params: this.getParams()
    }
  }

  getParams(): WidgetParams{
    return {
      request: ["result", "details"],
      max_products: this.requestOptions.params.limit || 16,
    }
  }

  path(): string {
    return ""
  }

  plType(): string{
    return ""
  }

  getHelpersToExpose(response, formattedResponse): {} {
    return {
      ...super.getHelpersToExpose(response, formattedResponse),
      getAnalyticsData: () => this.extractAnalyticsData(response),
      getProducts: () => formattedResponse ? formattedResponse.products : []
    }
  }

  extractAnalyticsData(response) {
    if(response === false){
      return {}
    }

    let plDetails: any = {}
    if (response.hasOwnProperty("sku")) {
      plDetails["product"] = response.sku
    }
    const productSkus = response["details"].map((product) => product.sku)
    return {
      event_type: "product_list",
      event_details: {
        pl_type: this.plType(),
        pl_details: plDetails,
        pl_products: productSkus,
        pl_total: productSkus.length
      }
    }
  }

  new(requestOptions){
    return this.getHelpersToExpose(false, false)
  }
}

export default Widget