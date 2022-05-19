import APIConnector from "../lib/apiConnector"
import { AnalyticsData } from "../shared/types"
import { SmartWidgetRequestOptions } from "./types"

class SmartWidget extends APIConnector {
  getRequestOptions() : SmartWidgetRequestOptions{
    return {
      path: `custom_widgets/${this.requestOptions.params.widgetId}`,
      params: {
        request: ["result", "details"],
        max_products: this.requestOptions.params.limit || 16,
      },
    }
  }

  formatResponse(response){
    return this.responseFormatter.smartWidgets(response)
  }

  extractAnalyticsData(response) : AnalyticsData {
    let plDetails: any = {
      id: this.requestOptions.params.widgetId,
      title: response.name
      // TODO: confirm url
    }
    const productSkus = response["details"].map((product) => product.sku)
    return {
      event_type: "product_list",
      event_details: {
        pl_type: "widget-custom",
        pl_details: plDetails,
        pl_products: productSkus,
        pl_total: productSkus.length
      }
    }
  }
}

export default new SmartWidget();